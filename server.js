require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { spawnSync } = require('node:child_process');
const logger = require('./utils/logger');
const deployRoutes = require('./routes/deploy');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const paymentRoutes = require('./routes/payments');
const { authLimiter, deployLimiter } = require('./middleware/rateLimiter');
const { errorHandler, setupProcessErrorHandlers } = require('./middleware/errorHandler');
const supabaseAuth = require('./middleware/supabaseAuth');

const { pool } = require('./services/db');
const { connection: redisClient } = require('./services/queue');

const app = express();
const PORT = process.env.PORT || 4000;

// Setup process handlers immediately
setupProcessErrorHandlers();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/auth', authLimiter, authRoutes);
app.use('/deploy', supabaseAuth, deployLimiter, deployRoutes);
app.use('/project', supabaseAuth, projectRoutes);
app.use('/payments', supabaseAuth, paymentRoutes);

app.get('/health', async (req, res) => {
    try {
        // 1. Check PostgreSQL
        await pool.query('SELECT 1');

        // 2. Check Redis
        const redisStatus = await redisClient.ping();
        if (redisStatus !== 'PONG') throw new Error('Redis PING failed');

        // 3. Check Docker
        const dockerStatus = spawnSync('docker', ['info']);
        if (dockerStatus.status !== 0) throw new Error('Docker daemon not responding');

        res.status(200).json({
            status: 'OK',
            message: 'Deployment Engine is running fully operational.',
            services: { db: 'up', redis: 'up', docker: 'up' }
        });
    } catch (error) {
        logger.error(`Healthcheck failed: ${error.message}`);
        res.status(503).json({ status: 'UNAVAILABLE', error: error.message });
    }
});

// Serve basic dummy legal endpoints until frontend hosts them
app.get('/legal/terms', (req, res) => res.json({ terms: 'Placeholder Terms & Conditions for Indian Beta' }));
app.get('/legal/privacy', (req, res) => res.json({ privacy: 'Placeholder Privacy Policy for Indian Beta' }));
app.get('/legal/refund', (req, res) => res.json({ refund: 'Placeholder Refund Policy for Indian Beta' }));

// Global Error Handler should be last
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Deployment Engine running on port ${PORT}`);
});
