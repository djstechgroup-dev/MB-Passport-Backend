const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

// Routes
const authRoutes = require("./routes/auth");

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);

// PORT
const port = 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
