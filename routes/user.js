const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/sign-up', userController.register);
router.get('/sign-in', userController.login);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/user/sign-in'
}), userController.createSession);
router.get('/sign-out', userController.destroySession);

module.exports = router;