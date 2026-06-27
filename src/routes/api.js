import express from 'express';
import { supabase } from '../db/supabase.js';

const router = express.Router();

// 1. GET /api/sales?phone=xxx — Get all sales for a specific trader
router.get('/sales', async (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ error: 'Phone number parameter is required' });

    try {
        const { data, error } = await supabase
            .from('sales')
            .select('*')
            .eq('trader_phone', phone)
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// 2. GET /api/inventory?phone=xxx — Get current stock
router.get('/inventory', async (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ error: 'Phone number parameter is required' });

    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .eq('trader_phone', phone);

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// 3. GET /api/alerts?phone=xxx — Get all payment verifications
router.get('/alerts', async (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ error: 'Phone number parameter is required' });

    try {
        const { data, error } = await supabase
            .from('alerts')
            .select('*')
            .eq('trader_phone', phone)
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// 4. POST /api/reminders — Create a new reminder manually if needed
router.post('/reminders', async (req, res) => {
    const { phone, message, remind_at } = req.body;

    try {
        const { data, error } = await supabase
            .from('reminders')
            .insert([
                {
                    trader_phone: phone,
                    message: message,
                    remind_at: new Date(remind_at),
                    delivered: false
                }
            ]);

        if (error) throw error;
        return res.status(201).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;