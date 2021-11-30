const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer = require('../models/customer');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    Customer.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (!user || user.password != password) {
                console.log("invalid username/password");
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log(err)
            return done(err);
        })
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    Customer.findByPk(id)
        .then(user => done(null, user))
        .catch(err => {
            console.log(err)
            return done(err);
        })
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect('/customer/login');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) res.locals.user = req.user
    else res.locals.user = null;
    next();
}

module.exports = passport;