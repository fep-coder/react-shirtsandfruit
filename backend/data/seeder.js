const Category = require("../models/category");
const Product = require("../models/product");
const Page = require("../models/page");
const User = require("../models/user");
const Order = require("../models/order");
const Rating = require("../models/rating");
const categories = require("../data/categories");
const products = require("../data/products");
const pages = require("../data/pages");
const users = require("../data/users");
const mongoose = require("mongoose");
const dbconnect = require("../data/db");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });
const fs = require("fs");

dbconnect();

const seedData = async () => {
    try {
        await Category.deleteMany({});
        await Product.deleteMany({});
        await Page.deleteMany({});
        await User.deleteMany({});

        await Category.insertMany(categories);
        const insertedProducts = await Product.insertMany(products);
        await Page.insertMany(pages);
        await User.insertMany(users);

        insertedProducts.forEach((product) => {
            const id = product._id.toString();
            const folderPath = `../frontend/public/gallery/${id}`;
            fs.mkdirSync(folderPath, { recursive: true });
        });

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
        await Page.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});
        await Rating.deleteMany({});

        const products = await Product.find({});
        products.forEach((product) => {
            const id = product._id.toString();
            const folderPath = `../frontend/public/gallery/${id}`;

            if (fs.existsSync(folderPath)) {
                fs.rmSync(folderPath, { recursive: true });
            }
        });

        await Product.deleteMany({});

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
