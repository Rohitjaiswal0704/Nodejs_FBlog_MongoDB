const mongoose = require("mongoose");

const blogModel = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    blog: String,
});

const Blog = mongoose.model("blog", blogModel);

module.exports = Blog;
