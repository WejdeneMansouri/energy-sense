const express = require('express');
const router = express.Router();
const Consumption = require('../models/consumption.model');
const Prediction = require('../models/prediction.model');
const Alert = require('../models/alert.model');

// GET /api/consumptions
router.get('/', async (req, res) => {
    try {
        const data = await Consumption.find().sort({ datetime: 1 }).limit(200);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/consumptions/predictions
router.get('/predictions', async (req, res) => {
    try {
        const data = await Prediction.find().sort({ targetDate: 1 });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/consumptions/alerts
router.get('/alerts', async (req, res) => {
    try {
        const data = await Alert.find().sort({ datetime: -1 });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;