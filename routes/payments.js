const express = require('express');
const router = express.Router();
const crypto = require('node:crypto');
const razorpay = require('../services/razorpay');
const { pool } = require('../services/db');
const { logAudit } = require('../services/auditLogger');
const { sendPaymentSuccess, sendPaymentFailed } = require('../services/mailer');
const authMiddleware = require('../middleware/authMiddleware');
const logger = require('../utils/logger');

// Store razorpay plans via your dashboard mapping in .env or static map
const PLAN_MAP = {
    '2': process.env.RZP_PRO_PLAN_ID,
    '3': process.env.RZP_MAX_PLAN_ID
};

// Checkout a new subscription
router.post('/checkout', authMiddleware, async (req, res) => {
    try {
        const { planId } = req.body;

        if (!PLAN_MAP[planId]) {
            return res.status(400).json({ error: 'Invalid plan selected or missing Razorpay Plan Mapping.' });
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: PLAN_MAP[planId],
            customer_notify: 1,
            total_count: 120, // 10 years by default for monthly subscriptions
        });

        // Store pending subscription
        await pool.query(
            "INSERT INTO subscriptions (user_id, razorpay_subscription_id, plan_id, status) VALUES ($1, $2, $3, 'created')",
            [req.user.id, subscription.id, planId]
        );

        res.json({ subscriptionId: subscription.id });

    } catch (error) {
        logger.error(`Error creating checkout: ${error.message}`);
        res.status(500).json({ error: 'Checkout creation failed' });
    }
});

// Cancel a subscription
router.post('/cancel', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT razorpay_subscription_id FROM subscriptions WHERE user_id = $1 AND status = $2', [req.user.id, 'active']);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No active subscription found' });
        }

        const subId = result.rows[0].razorpay_subscription_id;

        // Cancel at Razorpay
        await razorpay.subscriptions.cancel(subId);

        // Downgrade user to plan 1 (Free)
        await pool.query('UPDATE users SET plan_id = 1 WHERE id = $1', [req.user.id]);
        await pool.query("UPDATE subscriptions SET status = 'cancelled' WHERE razorpay_subscription_id = $1", [subId]);

        await logAudit(req.user.id, 'billing', 'subscription', { action: 'cancel', subId }, req.ip);

        res.json({ message: 'Subscription cancelled successfully' });

    } catch (error) {
        logger.error(`Error cancelling subscription: ${error.message}`);
        res.status(500).json({ error: 'Cancellation failed' });
    }
});

// Razorpay Webhooks (No authMiddleware because Razorpay hits this publicly, protect with secret signature)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret';
        const signature = req.headers['x-razorpay-signature'];

        const body = req.body.toString();
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        if (expectedSignature !== signature) {
            return res.status(400).json({ error: 'Invalid Signature' });
        }

        const event = JSON.parse(body);

        if (event.event === 'subscription.charged') {
            const subId = event.payload.subscription.entity.id;
            const paymentId = event.payload.payment.entity.id;
            const amount = event.payload.payment.entity.amount / 100; // Rs

            // Upgrade user based on pending subscription plan
            const subRes = await pool.query("UPDATE subscriptions SET status = 'active' WHERE razorpay_subscription_id = $1 RETURNING user_id, plan_id", [subId]);
            if (subRes.rows.length > 0) {
                const { user_id, plan_id } = subRes.rows[0];
                const userRes = await pool.query('UPDATE users SET plan_id = $1 WHERE id = $2 RETURNING email', [plan_id, user_id]);
                const email = userRes.rows[0].email;

                // Track invoice
                await pool.query(
                    "INSERT INTO invoices (user_id, razorpay_invoice_id, amount, status, paid_at) VALUES ($1, $2, $3, 'paid', NOW())",
                    [user_id, paymentId, amount]
                );

                await logAudit(user_id, 'billing', 'subscription', { action: 'charged', amount }, null);

                sendPaymentSuccess(email, amount).catch(console.error);
            }
        }
        else if (event.event === 'subscription.halted' || event.event === 'subscription.cancelled') {
            const subId = event.payload.subscription.entity.id;

            // Downgrade to Free plan
            const subRes = await pool.query("UPDATE subscriptions SET status = 'cancelled' WHERE razorpay_subscription_id = $1 RETURNING user_id", [subId]);
            if (subRes.rows.length > 0) {
                const user_id = subRes.rows[0].user_id;
                const userRes = await pool.query('UPDATE users SET plan_id = 1 WHERE id = $1 RETURNING email', [user_id]);
                const email = userRes.rows[0].email;

                // TODO: Stopping containers logic over limit needs to be here or in a Cron
                await logAudit(user_id, 'billing', 'subscription', { action: 'halted/cancelled' }, null);

                sendPaymentFailed(email).catch(console.error);
            }
        }

        // Return 200 immediately to let Razorpay know we received it
        res.status(200).json({ status: 'ok' });

    } catch (error) {
        logger.error(`Webhook error: ${error.message}`);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

module.exports = router;
