const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    urlId: {
        type: String,
        required: [true, 'Provide a unique url id'],
        unique: true
    },
    originalUrl: {
        type: String,
        required: [true, 'Provide original url'],
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Provide a valid URL']
    },
    shortUrl: {
        type: String,
        required: [true, 'Provide a short url']
    },
    clicks: {
        type: Number,
        default: 0,
        required: [true, 'provide url clicks']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Url', UrlSchema);
