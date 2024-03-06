const asyncHandler = require('../middleware/async');
const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const ErrorResponse = require('../utils/errorHandler');

// @description     Post a long url
// Route            POST /api/v1
exports.postUrl = asyncHandler(async (req, res, next) => {
    let url = await Url.findOne({ originalUrl: req.body.originalUrl });

    if (url) {
        return res.status(200).json({ success: true, data: url });
    }

    const baseUrl = process.env.BASE_URL;
    const urlId = nanoid(8);

    req.body.urlId = urlId;
    req.body.shortUrl = `${baseUrl}/${urlId}`;

    url = await Url.create(req.body);

    res.status(200).json({ success: true, data: url });
});

// @description     Post a long url
// Route            POST /api/v1/:id
exports.redirect = asyncHandler(async (req, res, next) => {
    if (!req.params.id) {
        return next(
            new ErrorResponse(`Invalid url id: ${req.params.id} `, 400)
        );
    }

    const url = await Url.findOne({ urlId: req.params.id });

    if (!url) {
        return next(new ErrorResponse(`Url not found.`, 404));
    }

    await Url.updateOne({ urlId: req.params.id }, { $inc: { clicks: 1 } });

    res.redirect(url.originalUrl);
});
