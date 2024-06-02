var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// POST /api/users/register - create new user
router.post("/register", async function (req, res) {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    try {
        await User.create(req.body);
        res.status(201).json({ message: "You have successfully registered" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/users/login - login user
router.post("/login", async function (req, res) {
    const user = await User.findOne({ username: req.body.username });

    if (user && (await user.matchPassword(req.body.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        res.json({
            id: user._id,
            username: user.username,
        });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// POST /api/users/logout - logout user
router.post("/logout", function (req, res) {
    res.clearCookie("jwt");

    res.status(200).json({ message: "You have successfully logged out" });
});

module.exports = router;
