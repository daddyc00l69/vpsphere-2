const { execFile } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const util = require('node:util');
const logger = require('../utils/logger');

const execFilePromise = util.promisify(execFile);

// Assuming deploying relative to the project root, adjust as needed. 
// E.g. d:\antigravitey\VPSphere\deployments
const DEPLOYMENTS_ROOT = path.resolve(__dirname, '../../deployments');

/**
 * Clones a git repository into the deployments directory isolated per user.
 * 
 * @param {string} repoUrl URL of the repository (HTTP/HTTPS)
 * @param {string} projectName Sanitized project name
 * @param {string} userId UUID of the user
 * @returns {Promise<string>} The absolute path to the cloned repository
 */
async function clone(repoUrl, projectName, userId) {
    if (!userId) {
        throw new Error('User ID is required for cloning isolated projects');
    }

    const userDeploymentsRoot = path.join(DEPLOYMENTS_ROOT, userId);

    if (!fs.existsSync(userDeploymentsRoot)) {
        fs.mkdirSync(userDeploymentsRoot, { recursive: true });
    }

    const targetPath = path.join(userDeploymentsRoot, projectName);

    try {
        if (fs.existsSync(targetPath)) {
            logger.info(`[${projectName}] Directory exists. Wiping and cloning fresh...`);
            fs.rmSync(targetPath, { recursive: true, force: true });
        }

        logger.info(`[${projectName}] Cloning repository: ${repoUrl}`);
        const { stdout } = await execFilePromise('git', ['clone', repoUrl, targetPath]);

        if (stdout) logger.info(`[${projectName}] Git Clone output: ${stdout}`);

        return targetPath;

    } catch (error) {
        logger.error(`[${projectName}] Git clone failed: ${error.message}`);
        throw new Error(`Failed to clone repository: ${error.message}`);
    }
}

module.exports = {
    clone
};
