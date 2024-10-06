const crypto = require("crypto");
const router = require("express").Router();
const Goal = require("../models/goal");
const goal = require("../models/goal");
router.get("/list", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/add", async (req, res) => {
  console.log("Add goal called for goal id:", req.body.goalId);
  const newGoal = new Goal({
    goalName: req.body.goalName,
    currentStreak: 0,
    maxStreak: 0,
    autoIncrement: req.body.autoIncrement,
    lastUpdated: new Date().toISOString(),
    goalId: crypto.randomUUID(),
  });

  try {
    const goalSaved = await newGoal.save();
    res.status(200).json(goalSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const response = await Goal.findByIdAndDelete(req.body.goalId);
    res.send(`Goal with Id: ${response.goalName} has been deleted!`);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
