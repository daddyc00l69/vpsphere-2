const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../services/db');
const logger = require('../utils/logger');
const { sendWelcomeEmail } = require('../services/mailer');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email and password are required' });
        }

        const validUsername = /^[a-z0-9]+$/.test(username);
        if (!validUsername) {
            return res.status(400).json({ error: 'Username must be lowercase alphanumeric only' });
        }

        const client = await pool.connect();
        try {
            // Check if user exists
            const userCheck = await client.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
            if (userCheck.rows.length > 0) {
                return res.status(409).json({ error: 'Username or email already exists' });
            }

            // Assign default free plan (Plan ID 1)
            const planCheck = await client.query('SELECT id FROM plans WHERE name = $1', ['Free']);
            if (planCheck.rows.length === 0) {
                return res.status(500).json({ error: 'No default plan configured in database' });
            }
            const planId = planCheck.rows[0].id;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await client.query(
                'INSERT INTO users (username, email, password_hash, plan_id) VALUES ($1, $2, $3, $4) RETURNING id, username, email, plan_id',
                [username, email, hashedPassword, planId]
            );

            logger.info(`User registered successfully: ${username}`);

            // Fire and forget welcome email
            sendWelcomeEmail(email, username).catch(console.error);

            res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });

        } finally {
            client.release();
        }

    } catch (error) {
        logger.error(`Registration error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, plan_id: user.plan_id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, plan_id: user.plan_id } });

    } catch (error) {
        logger.error(`Login error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
