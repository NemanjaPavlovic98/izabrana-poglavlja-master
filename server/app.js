const express = require("express");
const path = require("path");
const { errorNotCaught, errorNotFound } = require("./middleware/error");

const trainingRoutes = require("./routes/training.routes");
const exerciseRoutes = require("./routes/exercise.routes");
const musclesRoutes = require("./routes/muscles.routes");
const historyRoutes = require("./routes/history.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join("./", "/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//routes
app.use("/training", trainingRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/muscles", musclesRoutes);
app.use("/history", historyRoutes);
app.use("/auth", userRoutes);

app.use(errorNotFound);
app.use(errorNotCaught);

module.exports = app;
