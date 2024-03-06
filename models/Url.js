const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    urlId: {
        type: String,
        required: [true, 'Provide a unique URL id.'],
        unique: true
    },
    originalUrl: {
        type: String,
        required: [true, 'Provide original url'],
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Provide a valid URL.']
    },
    shortUrl: {
        type: String,
        required: [true, 'Provide a short URL.']
    },
    clicks: {
        type: Number,
        default: 0,
        required: [true, 'Provide URL clicks.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Url', UrlSchema);
