// cron.js
const cron = require("node-cron");
const Goal = require("../models/goal");

// Function to set up the daily cron job
const setupUpdateStreakCron = () => {
  console.log("Setup called for cron job scheduler");
  // Daily cron job to increment 'currentStreak' for active items
  cron.schedule("0 0 * * *", async () => {
    console.log(
      "Running daily increment/reset job for active goals at midnight"
    );

    try {
      // Find and update each active goal
      const goals = await Goal.find({});
      const updateGoalsPromises = goals.map(async (goal) => {
        if (goal.autoIncrement) {
          // Increment currentStreak if isAutoIncremented
          goal.currentStreak += 1;

          // Update maxStreak if currentStreak is higher
          if (goal.currentStreak > goal.maxStreak) {
            goal.maxStreak = goal.currentStreak;
          }
        } else {
          // Reset currentStreak if not active
          goal.currentStreak = 0;
        }

        // Save the item
        return goal.save();
      });

      // Wait for all updates to complete
      await Promise.all(updateGoalsPromises);
      console.log("currentStreak and maxStreak updated for all active Goals");
    } catch (error) {
      console.error("Error updating streaks:", error);
    }
  });
};

module.exports = setupUpdateStreakCron;
