const Category = require("../models/category");
const Product = require("../models/product");
const Page = require("../models/page");
const User = require("../models/user");
const categories = require("../data/categories");
const products = require("../data/products");
const pages = require("../data/pages");
const users = require("../data/users");
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
        await User.deleteMany({});

        await Category.insertMany(categories);
        await Product.insertMany(products);
        await Page.insertMany(pages);
        await User.insertMany(users);

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
        await User.deleteMany({});

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
