var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const { loggedIn, admin } = require("../middleware/auth");

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./frontend/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// POST /api/products - create new product
router.post(
    "/",
    loggedIn,
    admin,
    upload.single("image"),
    async function (req, res) {
        try {
            req.body.slug = req.body.name
                .toLowerCase()
                .trim()
                .replace(/ /g, "-");
            req.body.image = req.file ? req.file.filename : "noimage.jpg";

            const newProduct = await Product.create(req.body);

            const folderPath = `./frontend/public/gallery/${newProduct._id}`;
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            res.status(201).json({ message: "Product created" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// PUT /api/products/:id - update product
router.put(
    "/:id",
    loggedIn,
    admin,
    upload.single("image"),
    async function (req, res) {
        try {
            req.body.slug = req.body.name
                .toLowerCase()
                .trim()
                .replace(/ /g, "-");
            req.body.image = req.file
                ? req.file.filename
                : req.body.productImage;

            await Product.findByIdAndUpdate(req.params.id, req.body);

            const oldProductImage = req.file ? req.body.productImage : null;

            if (oldProductImage && oldProductImage !== "noimage.jpg") {
                const imagePath = `./frontend/public/images/${oldProductImage}`;
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log("File not found");
                }
            }

            res.status(200).json({ message: "Product updated!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// DELETE /api/products/:id - delete product
router.delete("/:id", loggedIn, admin, async function (req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/category/:slug - get products by category slug
router.get("/category/:slug", async function (req, res) {
    try {
        const slug = req.params.slug;
        const page = req.query.page;
        const pageSize = 5;

        const query = slug === "all" ? {} : { category: slug };
        const count = await Product.countDocuments(query);

        const products =
            slug === "all"
                ? await Product.find({})
                      .limit(pageSize)
                      .skip((page - 1) * pageSize)
                : await Product.find({ category: slug })
                      .limit(pageSize)
                      .skip((page - 1) * pageSize);

        res.status(200).json({
            products,
            page,
            totalPages: Math.ceil(count / pageSize),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/products/multiupload/:id
router.post("/multiupload/:id", loggedIn, admin, async function (req, res) {
    const id = req.params.id;
    const folderPath = `../frontend/public/gallery/${id}`;

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./frontend/public/gallery/" + id);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });

    const upload = multer({ storage: storage });

    upload.array("images")(req, res, function (error) {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        res.status(200).json({ message: "Files uploaded successfully" });
    });
});

// GET /api/products/images/:id - get images by product id
router.get("/images/:id", async function (req, res) {
    const id = req.params.id;
    const folderPath = `./frontend/public/gallery/${id}`;

    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({ message: "Folder not found" });
    }

    fs.readdir(folderPath, function (err, files) {
        if (err) {
            return res.status(500).json({ message: "Error reading folder" });
        }

        res.json(files);
    });
});

// POST /api/products/deleteimage - delete image
router.post("/deleteimage", loggedIn, admin, function (req, res) {
    const { id, image } = req.body;
    const imagePath = `./frontend/public/gallery/${id}/${image}`;

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        res.status(200).json({ message: "Image deleted successfully" });
    } else {
        res.status(404).json({ message: "Image not found" });
    }
});

// POST /api/products/:id - delete product
router.post("/:id", loggedIn, admin, async function (req, res) {
    const product = await Product.findById(req.params.id);
    const image = product.image;

    try {
        await Product.findByIdAndDelete(req.params.id);
        const folderPath = `./frontend/public/gallery/${req.params.id}`;
        if (fs.existsSync(folderPath)) {
            fs.rmdirSync(folderPath, { recursive: true });
        } else {
            console.log("Folder not found");
        }

        if (image !== "noimage.jpg") {
            const imagePath = `./frontend/public/images/${image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath, (err) => {
                    if (err) console.log(err);
                });
            } else {
                console.log("File not found");
            }
        }

        res.status(200).json({ message: "Product deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
