const { pool } = require('../services/db');
const logger = require('../utils/logger');

async function initializeDatabase() {
    logger.info('Initializing database schema...');

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Users Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                plan_id INTEGER NOT NULL,
                razorpay_customer_id VARCHAR(255),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Plans Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS plans (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                max_projects INTEGER NOT NULL,
                memory_limit_mb INTEGER NOT NULL,
                cpu_limit NUMERIC(3,2) NOT NULL,
                price NUMERIC(10,2) NOT NULL
            )
        `);

        // Insert default plans if none exist
        const result = await client.query('SELECT COUNT(*) FROM plans');
        if (parseInt(result.rows[0].count) === 0) {
            await client.query(`
                INSERT INTO plans (name, max_projects, memory_limit_mb, cpu_limit, price)
                VALUES 
                    ('Free', 1, 256, 0.25, 0.00),
                    ('Pro', 5, 512, 0.50, 10.00),
                    ('Max', 20, 1024, 1.00, 30.00)
            `);
            logger.info('Inserted default Plans.');
        }

        // Projects Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(50) NOT NULL,
                subdomain VARCHAR(255) UNIQUE NOT NULL,
                status VARCHAR(50) DEFAULT 'uninitialized',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, name)
            )
        `);

        // Deployments Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS deployments (
                id SERIAL PRIMARY KEY,
                project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
                status VARCHAR(50) NOT NULL,
                logs_path VARCHAR(500),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Subscriptions Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS subscriptions (
                id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                razorpay_subscription_id VARCHAR(255) UNIQUE NOT NULL,
                plan_id INTEGER NOT NULL,
                status VARCHAR(50) NOT NULL,
                current_end TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Invoices Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS invoices (
                id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                razorpay_invoice_id VARCHAR(255) UNIQUE NOT NULL,
                amount NUMERIC(10,2) NOT NULL,
                status VARCHAR(50) NOT NULL,
                paid_at TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // AuditLog Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                action VARCHAR(100) NOT NULL,
                target_resource VARCHAR(255),
                details JSONB,
                ip_address VARCHAR(45),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await client.query('COMMIT');
        logger.info('Database initialized successfully.');

    } catch (error) {
        await client.query('ROLLBACK');
        logger.error(`Database initialization failed: ${error.message}`);
        throw error;
    } finally {
        client.release();
    }
}

// Run if called directly
if (require.main === module) {
    initializeDatabase()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = { initializeDatabase };
