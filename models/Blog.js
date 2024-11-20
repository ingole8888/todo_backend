const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, default: 'default' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);