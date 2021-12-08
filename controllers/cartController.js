const {
    Op
} = require("sequelize");
const Cart = require('../models/cart');

module.exports.cart = (req, res) => {
    return res.render('cart', {
        title: "Cart"
    });
}

module.exports.add = (req, res) => {
    return Cart.findOrCreate({
            where: {
                [Op.and]: [{
                        customerId: req.user.id
                    },
                    {
                        ISBN: req.query.ISBN
                    }
                ]
            },
            defaults: {
                customerId: req.user.id,
                ISBN: req.query.ISBN,
                quantity: 0
            }
        })
        .then(() => {
            return Cart.increment('quantity', {
                by: 1,
                where: {
                    [Op.and]: [{
                            customerId: req.user.id
                        },
                        {
                            ISBN: req.query.ISBN
                        }
                    ]
                }
            });

        })
        .then(() => res.redirect('back'))
        .catch(err => console.log(err));
}