const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TrackerData = require('../models/TrackerData');

// @route   GET api/tracker
// @desc    Get user's tracker data
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        let trackerData = await TrackerData.findOne({ user: req.user.id });
        if (!trackerData) {
            trackerData = new TrackerData({ user: req.user.id, bmi: null, logs: {} });
            await trackerData.save();
        }
        res.json(trackerData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/tracker/bmi
// @desc    Update user's BMI data
// @access  Private
router.post('/bmi', auth, async (req, res) => {
    const { bmi } = req.body;
    try {
        let trackerData = await TrackerData.findOne({ user: req.user.id });
        if (!trackerData) {
            trackerData = new TrackerData({ user: req.user.id, bmi, logs: {} });
        } else {
            trackerData.bmi = bmi;
        }
        await trackerData.save();
        res.json(trackerData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/tracker/log
// @desc    Update a specific day's log
// @access  Private
router.post('/log', auth, async (req, res) => {
    const { dateStr, logData } = req.body;
    try {
        let trackerData = await TrackerData.findOne({ user: req.user.id });
        if (!trackerData) {
            trackerData = new TrackerData({ user: req.user.id, bmi: null, logs: {} });
        }

        // Update the Map
        trackerData.logs.set(dateStr, logData);

        await trackerData.save();
        res.json(trackerData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
