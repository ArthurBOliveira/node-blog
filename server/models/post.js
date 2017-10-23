const mongoose = require('mongoose');

let Post = mongoose.model('Post', {
    title: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true,
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = {Post};