require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const tokenChecker = require("./middleware/tokenChecker")
const challengesRouter = require("./routes/challenges");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const emailRoutes = require("./routes/email");
const paymentRoutes = require("./routes/payment"); 

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/challenges", tokenChecker, challengesRouter);
app.use("/api/tokens", tokensRouter);
app.use("/api/users", usersRouter);
app.use("/api/email", emailRoutes);
app.use("/api", paymentRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: 'server error' });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

var mongoDbUrl = process.env.MONGODB_URL || "mongodb://0.0.0.0/acebook";
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connection Successful");
}).catch((err) => {
  console.log("Mongoose error", err);
});


module.exports = app;
