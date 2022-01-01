const {
    Op
} = require("sequelize");
const Order = require('../models/order');
const Cart = require('../models/cart');
const Book = require('../models/book');

module.exports.order = (req, res) => {
    Order.findAll({
            attributes: ['id', 'ISBN', 'quantity', 'completion', 'paymentMode', 'paymentDate', 'deliveryDate'],
            where: {
                customerId: req.user.id
            },
            order: [
                ['id', 'DESC']
            ],
            raw: true
        })
        .then(async orders => {

            for (let order of orders) {
                await Book.findByPk(order.ISBN, {
                        attributes: ['title', 'price', 'discount', 'type', 'frontImage'],
                        raw: true
                    })
                    .then(bookData => {
                        order.title = bookData.title,
                            order.price = bookData.price * (100 - bookData.discount) / 100 * order.quantity,
                            order.frontImage = bookData.frontImage
                    })
                    .catch(err => console.log(err));
            }

            return res.render('order', {
                title: "Orders",
                orders: orders,
            });
        })
        .catch();
}

module.exports.orderOne = (req, res) => {
    Order.create({
            customerId: req.user.id,
            ISBN: req.query.ISBN
        })
        .then(() => res.redirect('/order'))
        .catch(err => console.log(err));
}

module.exports.orderAll = (req, res) => {
    Cart.findAll({
            attributes: ['ISBN', 'quantity'],
            where: {
                customerId: req.user.id
            },
            raw: true
        })
        .then(async cartItems => {
            for (let item of cartItems) {
                await Order.create({
                        customerId: req.user.id,
                        quantity: item.quantity,
                        ISBN: item.ISBN
                    })
                    .then(async () => {
                        await Cart.destroy({
                                where: {
                                    [Op.and]: [{
                                            customerId: req.user.id
                                        },
                                        {
                                            ISBN: item.ISBN
                                        }
                                    ]
                                }
                            })
                            .catch(err => console.log(err));

                        await Book.decrement('quantity', {
                            by: item.quantity,
                            where: {
                                ISBN: item.ISBN
                            }
                        });
                    })
                    .catch(err => console.log(err));
            }
            return res.redirect('/order');
        })
        .catch(err => console.log(err));
}