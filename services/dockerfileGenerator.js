const fs = require('node:fs');
const path = require('node:path');
const logger = require('../utils/logger');

/**
 * Generates a Dockerfile in the project root based on the detected framework.
 * 
 * @param {string} projectPath Absolute path to the cloned code
 * @param {string} framework 'next', 'react', or 'static'
 */
async function generate(projectPath, framework) {
    const dockerfilePath = path.join(projectPath, 'Dockerfile');

    let content = '';

    if (framework === 'next') {
        content = `
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
        `.trim();
    } else if (framework === 'react') {
        // Detect if it's Vite or CRA by reading package.json
        let buildDir = 'build'; // CRA default
        try {
            const pkgPath = path.join(projectPath, 'package.json');
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            if (deps.vite) {
                buildDir = 'dist'; // Vite default
            }
        } catch (e) {
            logger.warn(`Could not determine react build output dir for ${projectPath}, defaulting to 'build'`);
        }

        content = `
# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/${buildDir} /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
        `.trim();
    } else if (framework === 'static') {
        content = `
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
        `.trim();
    } else {
        throw new Error(`Cannot generate Dockerfile for unknown framework: ${framework}`);
    }

    // Write the Dockerfile
    fs.writeFileSync(dockerfilePath, content, 'utf8');
    logger.info(`Generated Dockerfile for ${framework} at ${dockerfilePath}`);
}

module.exports = {
    generate
};
