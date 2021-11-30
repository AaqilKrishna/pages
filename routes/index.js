const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.use('/customer', require('./customer'));

module.exports = router;