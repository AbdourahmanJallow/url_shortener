const express = require('express');
const { postUrl, redirect } = require('../controllers/urls');

const router = express.Router();

router.post('/short', postUrl);
router.get('/:id', redirect);

module.exports = router;
