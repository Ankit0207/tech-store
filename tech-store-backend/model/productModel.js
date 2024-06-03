const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { versionKey: false, timestamps: true });

const BlogModel = mongoose.model('Product', blogSchema);

module.exports = { BlogModel };