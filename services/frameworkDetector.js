const fs = require('node:fs');
const path = require('node:path');
const logger = require('../utils/logger');

/**
 * Detects the framework of a given project path based on package.json
 * or existence of index.html.
 * 
 * @param {string} projectPath Absolute path to the cloned code
 * @returns {Promise<string>} 'next', 'react', or 'static'
 */
async function detect(projectPath) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const indexHtmlPath = path.join(projectPath, 'index.html');

    if (fs.existsSync(packageJsonPath)) {
        try {
            const rawData = fs.readFileSync(packageJsonPath, 'utf-8');
            const pkg = JSON.parse(rawData);

            const deps = { ...pkg.dependencies, ...pkg.devDependencies };

            if (deps['next']) {
                logger.info(`Detected framework: next.js for ${projectPath}`);
                return 'next';
            }

            if (deps['react']) {
                logger.info(`Detected framework: react for ${projectPath}`);
                return 'react';
            }
        } catch (error) {
            logger.error(`Failed to parse package.json at ${packageJsonPath}: ${error.message}`);
            throw new Error(`Invalid package.json file: ${error.message}`);
        }
    }

    // If no package.json or neither next/react was found but index.html exists
    if (fs.existsSync(indexHtmlPath)) {
        logger.info(`Detected framework: static for ${projectPath}`);
        return 'static';
    }

    throw new Error('Unsupported framework: Could not detect Next.js, React, or pure Static HTML app');
}

module.exports = {
    detect
};
