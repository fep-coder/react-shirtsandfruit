const Category = require("../models/category");
const Product = require("../models/product");
const Page = require("../models/page");
const categories = require("../data/categories");
const products = require("../data/products");
const pages = require("../data/pages");
const mongoose = require("mongoose");
const dbconnect = require("../data/db");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

dbconnect();

const seedData = async () => {
    try {
        await Category.deleteMany({});
        await Product.deleteMany({});
        await Page.deleteMany({});

        await Category.insertMany(categories);
        await Product.insertMany(products);
        await Page.insertMany(pages);

        console.log("Data imported!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Category.deleteMany({});
        await Product.deleteMany({});
        await Page.deleteMany({});

        console.log("Data destroyed!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    seedData();
}
