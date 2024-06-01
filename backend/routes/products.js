var express = require("express");
var router = express.Router();
const Product = require("../models/product");

// GET /api/products - get all products
router.get("/", async function (req, res, next) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id - get product by id
router.get("/:id", async function (req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/products - create new product
router.post("/", async function (req, res) {
    try {
        req.body.slug = req.body.name.toLowerCase().trim().replace(/ /g, "-");
        req.body.image = req.body.image || "noimage.jpg";

        await Product.create(req.body);

        res.status(201).json({ message: "Product created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/products/:id - update product
router.put("/:id", async function (req, res) {
    try {
        req.body.slug = req.body.name.toLowerCase().trim().replace(/ /g, "-");
        req.body.image = req.body.image || "noimage.jpg";

        await Product.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({ message: "Product updated!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/products/:id - delete product
router.delete("/:id", async function (req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/category/:slug - get products by category slug
router.get("/category/:slug", async function (req, res) {
    const slug = req.params.slug;

    try {
        const products =
            slug === "all"
                ? await Product.find({})
                : await Product.find({ category: req.params.slug });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;