const jwt = require("jsonwebtoken");
const User = require("../models/user");

const loggedIn = async (req, res, next) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate" });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ error: "Not authorized as an admin" });
    }
};

module.exports = { loggedIn, admin };