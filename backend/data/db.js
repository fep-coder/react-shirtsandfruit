const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbconnect;
