import express from "express";
import auth from "../middleware/auth.js";
import TrackerData from "../models/TrackerData.js";

const router = express.Router();

// @route   GET api/tracker
// @desc    Get user's tracker data
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let trackerData = await TrackerData.findOne({ user: req.user.id });

    if (!trackerData) {
      trackerData = new TrackerData({
        user: req.user.id,
        bmi: null,
        logs: {}
      });

      await trackerData.save();
    }

    res.json(trackerData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/tracker/bmi
// @desc    Update user's BMI
// @access  Private
router.post("/bmi", auth, async (req, res) => {
  const { bmi } = req.body;

  try {
    let trackerData = await TrackerData.findOne({ user: req.user.id });

    if (!trackerData) {
      trackerData = new TrackerData({
        user: req.user.id,
        bmi,
        logs: {}
      });
    } else {
      trackerData.bmi = bmi;
    }

    await trackerData.save();

    res.json(trackerData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/tracker/log
// @desc    Update daily log
// @access  Private
router.post("/log", auth, async (req, res) => {
  const { dateStr, logData } = req.body;

  try {
    let trackerData = await TrackerData.findOne({ user: req.user.id });

    if (!trackerData) {
      trackerData = new TrackerData({
        user: req.user.id,
        bmi: null,
        logs: {}
      });
    }

    trackerData.logs.set(dateStr, logData);

    await trackerData.save();

    res.json(trackerData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;