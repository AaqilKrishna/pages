const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/register', customerController.register);
router.get('/login', customerController.login);
router.post('/create', customerController.create);

module.exports = router;