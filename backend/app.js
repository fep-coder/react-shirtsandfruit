var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dbconnect = require("./data/db");
require("dotenv").config();

dbconnect();

const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const pagesRouter = require("./routes/pages");
const usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/users", usersRouter);

module.exports = app;
