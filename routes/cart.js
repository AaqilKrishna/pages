const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');

router.get('/', cartController.cart);
router.get('/add', cartController.add);

module.exports = router;