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
    if (req.body.password !== req.body.confirmPassword)
        return res.redirect('back');

    Customer.findOne({
            where: {
                [Op.or]: [{
                        email: req.body.email
                    },
                    {
                        phoneNo: req.body.phoneNo
                    }
                ]
            }
        })
        .then(user => {
            if (!user) {
                return Customer.create(req.body)
                    .then(() => res.redirect('login'))
                    .catch(err => console.log(err));
            }
            console.log("email or phoneNo already exists");
            return res.redirect('back');
        })
        .catch(err => console.log(err));
}

module.exports.createSession = (req, res) => res.redirect('/');

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/')
};