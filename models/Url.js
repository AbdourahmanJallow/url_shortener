const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    urlId: {
        type: String,
        required: [true, 'Provide a unique url id'],
        unique: true
    },
    orginalUrl: {
        type: String,
        required: [true, 'Provide original url']
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

export default mongoose.models('Url', UrlSchema);
