const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const setupUpdateStreakCron = require("./crons/goalCrons");

const app = express();

mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

setupUpdateStreakCron();

const goalsRoutes = require("./routes/goals");
const managementRoutes = require("./routes/management");
// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log(`Goals [${req.url}] Requested At Time: ${Date.now()}`);
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(timeLog);
app.use("/api/goals", goalsRoutes);
app.use("/api/goal-management", managementRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is running on PORT: ${process.env.PORT}`);
});
