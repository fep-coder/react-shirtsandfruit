var express = require("express");
var router = express.Router();
const Page = require("../models/page");
const page = require("../models/page");

// GET /api/pages - get all pages
router.get("/", async function (req, res, next) {
    try {
        const pages = await Page.find({}).sort("order");
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/pages/:slug - get page by slug
router.get("/:slug", async function (req, res) {
    try {
        const slug = req.params.slug || "home";
        const page = await Page.findOne({ slug });

        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }

        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/pages - create new page
router.post("/", async function (req, res) {
    try {
        req.body.slug = req.body.name.toLowerCase().trim().replace(/ /g, "-");

        await Page.create(req.body);

        res.status(201).json({ message: "Page created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/pages/:id - update page
router.put("/:id", async function (req, res) {
    try {
        req.body.slug = req.body.name.toLowerCase().trim().replace(/ /g, "-");

        await Page.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({ message: "Page updated!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/pages/:id - delete page
router.delete("/:id", async function (req, res) {
    try {
        await Page.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Page deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/pages/reorder - reorder pages
router.post("/reorder", async function (req, res) {
    const idArray = req.body;

    try {
        for (let i = 0; i < idArray.length; i++) {
            const id = idArray[i];
            console.log(i, id);

            await Page.findOneAndUpdate({ _id: id }, { order: i });
        }

        res.status(200).json({ message: "Pages reordered!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
