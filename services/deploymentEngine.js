const { spawn } = require('node:child_process');
const logger = require('../utils/logger');

/**
 * Runs a shell command and logs its output locally. Resolves on success, rejects on failure.
 */
function runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const cmdString = `${command} ${args.join(' ')}`;
        logger.info(`[Executing]: ${cmdString}`);

        const child = spawn(command, args, { cwd, shell: false });

        child.stdout.on('data', (data) => {
            logger.info(`[STDOUT] ${data.toString().trim()}`);
        });

        child.stderr.on('data', (data) => {
            // Docker build outputs to stderr a lot, so we treat it as info unless process fails
            logger.info(`[STDERR/INFO] ${data.toString().trim()}`);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });

        child.on('error', (err) => {
            reject(new Error(`Failed to start subprocess: ${err.message}`));
        });
    });
}

/**
 * Builds and runs the Docker container using docker CLI with tenant isolation.
 * 
 * @param {string} projectPath Absolute path to the cloned repository
 * @param {string} projectName Sanitized project name
 * @param {string} framework 'next', 'react', or 'static'
 * @param {string} username Tenant username
 * @param {string} userId Tenant ID
 * @param {number} memoryLimitMb Memory limit mapped from user's plan
 * @param {number} cpuLimit CPU limit mapped from user's plan
 */
async function deploy(projectPath, projectName, framework, username, userId, memoryLimitMb, cpuLimit) {
    const uniqueContainerName = `${userId.substring(0, 8)}-${projectName}`;
    const imageName = `deploy-${uniqueContainerName}`;

    // 1. Build the Docker image
    logger.info(`[${projectName}] Building Docker image: ${imageName}...`);
    await runCommand('docker', ['build', '-t', imageName, '.'], projectPath);

    // 2. Stop and remove existing container if it exists
    logger.info(`[${projectName}] Stopping and removing old container if exists...`);
    try {
        await runCommand('docker', ['rm', '-f', uniqueContainerName], projectPath);
    } catch (e) {
        logger.info(`[${projectName}] No existing container found to remove.`);
    }

    // 3. Run the new container
    // Next.js exposes 3000, React/Static exposes 80
    const exposedPort = framework === 'next' ? 3000 : 80;

    // Use environment variable for domain, or fallback to mydomain.net
    const domain = process.env.BASE_DOMAIN || 'mydomain.net';
    const hostRule = `${projectName}.${username}.${domain}`;

    const dockerRunArgs = [
        'run', '-d',
        '--name', uniqueContainerName,
        '--network', 'deployment_network',
        '--memory', `${memoryLimitMb}m`,
        '--cpus', `${cpuLimit}`,
        '--restart', 'unless-stopped',
        // Traefik labels
        '-l', 'traefik.enable=true',
        '-l', `traefik.http.routers.${uniqueContainerName}.rule=Host(\`${hostRule}\`)`,
        '-l', `traefik.http.services.${uniqueContainerName}.loadbalancer.server.port=${exposedPort}`,
        imageName
    ];

    logger.info(`[${projectName}] Starting new container...`);
    await runCommand('docker', dockerRunArgs, projectPath);
    logger.info(`[${projectName}] Container successfully deployed and running!`);
}

module.exports = {
    deploy
};
