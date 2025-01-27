const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    body: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 100,
    },
});

module.exports = mongoose.model("Page", pageSchema);
