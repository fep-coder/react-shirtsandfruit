var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dbconnect = require("./data/db");
require("dotenv").config();

dbconnect();

const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

module.exports = app;
