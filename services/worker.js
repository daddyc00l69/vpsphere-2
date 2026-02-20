const { Worker } = require('bullmq');
const { connection } = require('./queue');
const logger = require('../utils/logger');
const { pool } = require('./db');
const { sendDeploymentSuccess } = require('./mailer');

const gitService = require('./gitService');
const frameworkDetector = require('./frameworkDetector');
const dockerfileGenerator = require('./dockerfileGenerator');
const deploymentEngine = require('./deploymentEngine');

// Define the background worker process
const worker = new Worker('deployments', async job => {
    const { repoUrl, projectName, user, plan, projectId, deploymentId } = job.data;
    logger.info(`[Worker] Started processing deployment for ${projectName} (Job ${job.id})`);

    try {
        // Marks project as building in database
        await pool.query("UPDATE projects SET status = 'building' WHERE id = $1", [projectId]);
        await pool.query("UPDATE deployments SET status = 'building' WHERE id = $1", [deploymentId]);

        logger.info(`[${projectName}] Step 1: Cloning repository...`);
        const repoPath = await gitService.clone(repoUrl, projectName, user.id);

        logger.info(`[${projectName}] Step 2: Detecting framework...`);
        const framework = await frameworkDetector.detect(repoPath);

        logger.info(`[${projectName}] Step 3: Generating Dockerfile for ${framework}...`);
        await dockerfileGenerator.generate(repoPath, framework);

        logger.info(`[${projectName}] Step 4: Building and running container...`);
        await deploymentEngine.deploy(
            repoPath,
            projectName,
            framework,
            user.username,
            user.id,
            plan.memory_limit_mb,
            plan.cpu_limit
        );

        logger.info(`[Worker] Deployment ${projectName} completed successfully`);

        await pool.query("UPDATE projects SET status = 'running' WHERE id = $1", [projectId]);
        await pool.query("UPDATE deployments SET status = 'running' WHERE id = $1", [deploymentId]);

        const subdomain = `${projectName}.${user.username}.${process.env.BASE_DOMAIN || 'mydomain.net'}`;

        // Fetch User Email
        const userRes = await pool.query('SELECT email FROM users WHERE id = $1', [user.id]);
        if (userRes.rows.length > 0) {
            sendDeploymentSuccess(userRes.rows[0].email, projectName, `http://${subdomain}`).catch(console.error);
        }

    } catch (error) {
        logger.error(`[Worker] Deployment failed for ${projectName}: ${error.message}`);
        await pool.query("UPDATE projects SET status = 'failed' WHERE id = $1", [projectId]).catch(console.error);
        await pool.query("UPDATE deployments SET status = 'failed' WHERE id = $1", [deploymentId]).catch(console.error);
        throw error;
    }
}, { connection });

worker.on('failed', (job, err) => {
    logger.error(`${job.id} has failed with ${err.message}`);
});

module.exports = {
    worker
};
