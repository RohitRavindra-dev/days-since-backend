const router = require("express").Router();
const Goal = require("../models/goal");

router.post("/increment", async (req, res) => {
  console.log("Increment goal called for goal id:", req.body.goalId);

  try {
    // Find the item by ID
    const goal = await Goal.findById(req.body.goalId);
    if (!goal) return res.status(404).send("Goal not found");

    // Increment the current streak field
    goal.currentStreak += 1;

    //Update the max streak field respectively
    goal.maxStreak = Math.max(goal.maxStreak, goal.currentStreak);
    // Save the updated goal
    await goal.save();

    res.status(200).json({
      message: "Goal Streak Incremented successfully",
      goal: goal.goalName,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/reset", async (req, res) => {
  try {
    // Find the item by ID
    const goal = await Goal.findById(req.body.goalId);
    if (!goal) return res.status(404).send("Goal not found");

    // Reset the current streak field
    goal.currentStreak = 0;

    // Save the updated goal
    await goal.save();

    res.status(200).json({
      message: "Goal Streak Reseted successfully",
      goal: goal.goalName,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/override/set", async (req, res) => {
  console.log("Override set for goal called for goal id:", req.body.goalId);
  res.send("TODO Override set goal streak");
});

router.post("/toggle/auto-increment", async (req, res) => {
  console.log(
    "Toggle auto-increment for goal called for goal id: ",
    req.body.goalId
  );
  try {
    // Find the item by ID
    const goal = await Goal.findById(req.body.goalId);
    if (!goal) return res.status(404).send("Goal not found");

    // Reset the current streak field
    goal.autoIncrement = !goal.autoIncrement;

    // Save the updated goal
    await goal.save();

    res.status(200).json({
      message: `Goal ${goal.goalName} streak auto-increment turned ${
        goal.autoIncrement ? "ON" : "OFF"
      }!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
