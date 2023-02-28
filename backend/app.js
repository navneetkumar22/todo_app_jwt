require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRoutes);

connectToDB();

module.exports = app;