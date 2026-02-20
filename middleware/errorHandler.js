const logger = require('../utils/logger');

// Express Global Error Handler
function errorHandler(err, req, res, next) {
    logger.error(`[GlobalErrorHandler] ${err.name}: ${err.message}\nStack: ${err.stack}`);

    // Do not leak stack traces to the client in production
    res.status(500).json({
        error: 'An unexpected internal server error occurred. Our team has been notified.'
    });
}

// Global Process Event Listeners to prevent node from crashing fully
function setupProcessErrorHandlers() {
    process.on('uncaughtException', (err) => {
        logger.error(`[UncaughtException] ${err.message}\nStack: ${err.stack}`);
        // Optionally trigger pagerduty/mail here
        // Generally recommended to gracefully shutdown after this, but for PaaS beta:
        // process.exit(1); 
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error(`[UnhandledRejection] At: ${promise}, reason: ${reason}`);
    });
}

module.exports = {
    errorHandler,
    setupProcessErrorHandlers
};
