const { pool } = require('./db');
const logger = require('../utils/logger');

/**
 * Logs a tracking event to the database.
 * 
 * @param {string} userId - UUID of the user performing the action
 * @param {string} action - 'deploy', 'start', 'stop', 'delete', 'login', 'billing'
 * @param {string} targetResource - Name/ID of the resource touched (e.g. 'project-abc')
 * @param {object} details - Any JSON metadata
 * @param {string} ipAddress - IP address of the requester
 */
async function logAudit(userId, action, targetResource = null, details = {}, ipAddress = null) {
    try {
        await pool.query(
            'INSERT INTO audit_logs (user_id, action, target_resource, details, ip_address) VALUES ($1, $2, $3, $4, $5)',
            [userId, action, targetResource, JSON.stringify(details), ipAddress]
        );
    } catch (error) {
        // We log locally but do not throw to prevent crashing the main flow
        logger.error(`[AuditLogger] Failed to write audit log for user ${userId} [${action}]: ${error.message}`);
    }
}

module.exports = {
    logAudit
};
