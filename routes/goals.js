const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("List of Goals goes here");
});

router.post("/increment", (req, res) => {
  console.log("Increment goal called for goal id:", req.body.goalId);
  res.send("Incremented goal steak");
});

router.post("/reset", (req, res) => {
  console.log("Reset goal called for goal id:", req.body.goalId);
  res.send("Reset goal steak");
});
module.exports = router;
