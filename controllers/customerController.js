const {
    Op
} = require("sequelize");
const Customer = require('../models/customer');

module.exports.login = (req, res) => {
    return res.render('login', {
        title: "Login"
    });
}

module.exports.register = (req, res) => {
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
        .then(data => {
            console.log(req.body);
            if (!data) {
                return Customer.create(req.body)
                    .then(() => res.redirect('login'))
                    .catch(err => console.log(err));
            }
            console.log("email or phoneNo already exists");
            return res.redirect('back');
        })
        .catch(err => console.log(err));
}