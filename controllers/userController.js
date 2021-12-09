const {
    Op
} = require("sequelize");
const Customer = require('../models/customer');

module.exports.login = (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/');
    return res.render('login', {
        title: "Login"
    });
}

module.exports.register = (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/');
    return res.render('register', {
        title: "Register"
    });
}

module.exports.create = (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Password Mismatch');
        return res.redirect('back');
    } else {
        return Customer.findOne({
                where: {
                    email: req.body.email
                },
                raw: true
            })
            .then(user => {
                if (user) {
                    req.flash('error', 'Email already exists');
                    return res.redirect('back');
                } else {
                    return Customer.findOne({
                            where: {
                                phoneNo: req.body.phoneNo
                            },
                            raw: true
                        })
                        .then(user => {
                            if (user) {
                                req.flash('error', 'Phone No already exists');
                                return res.redirect('back');
                            } else {
                                return Customer.create(req.body)
                                    .then(() => {
                                        req.flash('success', 'Registered');
                                        return res.redirect('login');
                                    })
                                    .catch(err => console.log(err));
                            }
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }
}

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged In');
    return res.redirect('/');
};

module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out');
    return res.redirect('/')
};