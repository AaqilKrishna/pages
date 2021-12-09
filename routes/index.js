const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const passport = require('passport');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/book', require('./book'));
router.use('/order', require('./order'));
router.use('/cart', passport.checkAuthentication, require('./cart'));

module.exports = router;