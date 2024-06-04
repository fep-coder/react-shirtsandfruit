var express = require("express");
var router = express.Router();
const Order = require("../models/order");
const { loggedIn } = require("../middleware/auth");

// POST /api/orders - create new order
router.post("/", loggedIn, async function (req, res, next) {
    try {
        await Order.create(req.body);
        res.status(201).json({ message: "Order created!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
