const router = require("express").Router();

router.post("/increment", (req, res) => {
  console.log("Increment goal called for goal id:", req.body.goalId);
  res.send("Incremented goal steak");
});

router.post("/reset", (req, res) => {
  console.log("Reset goal called for goal id:", req.body.goalId);
  res.send("Reset goal steak");
});

router.post("/override/set", (req, res) => {
  console.log("Override set for goal called for goal id:", req.body.goalId);
  res.send("Override set goal streak");
});

router.post("/toggle/auto-increment", (req, res) => {
  console.log(
    "Toggle auto-increment for goal called for goal id: ",
    req.body.goalId
  );
  res.send("Toggled goal auto-incrment");
});

module.exports = router;
