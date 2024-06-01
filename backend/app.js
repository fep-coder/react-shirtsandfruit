var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dbconnect = require("./data/db");
require("dotenv").config();

dbconnect();

const categoriesRouter = require("./routes/categories");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categoriesRouter);

module.exports = app;
