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

    const urlId = nanoid(8);

    req.body.urlId = urlId;
    req.body.shortUrl = `${process.env.BASE_URL}/${urlId}`;

    url = await Url.create(req.body);

    res.status(200).json({ success: true, data: url.shortUrl });
});

// @description     Post a long url
// Route            POST /api/v1/:id
exports.redirect = asyncHandler(async (req, res, next) => {
    const url = await Url.findOne({ urlId: req.params.id });

    if (!url) {
        return next(new ErrorResponse(`Url not found.`, 404));
    }

    await Url.updateOne({ urlId: req.params.id }, { $inc: { clicks: 1 } });

    res.redirect(url.originalUrl);
});

exports.tinyUrl = asyncHandler(async (req, res, next) => {
    const token = process.env.TOKEN;

    if (!req.body.originalUrl) {
        return next(new ErrorResponse(`Provide long URL`));
    }

    const response = await fetch(`https://tinyurl.com/api-create.php`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url: req.body.originalUrl })
    });

    const url = await response.text();

    res.status(200).json({ success: true, data: url });
});
