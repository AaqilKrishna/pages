const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const passport = require('passport');

router.get('/:ISBN', bookController.bookSingle);

module.exports = router;