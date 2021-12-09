const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');

router.get('/', cartController.cart);
router.get('/add', cartController.add);
router.get('/remove', cartController.remove);
router.get('/destroy', cartController.destroy);

module.exports = router;