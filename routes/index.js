const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const passport = require('passport');

router.get('/', bookController.book);
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/book', require('./book'));
router.use('/order', require('./order'));
router.use('/cart', passport.checkAuthentication, require('./cart'));

module.exports = router;