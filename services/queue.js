const { Queue } = require('bullmq');
const Redis = require('ioredis');
const logger = require('../utils/logger');

// Setup redis connection
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
});

connection.on('error', (err) => {
    logger.error(`Redis connection error: ${err.message}`);
});

const deploymentQueue = new Queue('deployments', { connection });

module.exports = {
    deploymentQueue,
    connection
};
