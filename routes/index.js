const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));

module.exports = router;