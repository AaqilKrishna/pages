const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const passport = require('passport');

router.get('/', orderController.order);
router.get('/orderOne', orderController.orderOne);
router.get('/orderAll', orderController.orderAll);

module.exports = router;