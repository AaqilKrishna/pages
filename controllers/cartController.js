const {
    Op
} = require("sequelize");
const Cart = require('../models/cart');
const Book = require('../models/book');
const BookAuthor = require('../models/author');

module.exports.cart = (req, res) => {
    Cart.findAll({
            attributes: ['ISBN', 'quantity'],
            where: {
                customerId: req.user.id
            },
            raw: true
        })
        .then(async books => {
            for (let book of books) {
                await Book.findByPk(book.ISBN, {
                        attributes: ['title', 'price', 'discount', 'type', 'image'],
                        raw: true
                    })
                    .then(bookData => {
                        book.title = bookData.title,
                            book.price = bookData.price,
                            book.discount = bookData.discount,
                            book.type = bookData.type,
                            book.image = bookData.image
                    })
                    .catch(err => console.log(err));

                await BookAuthor.findAll({
                        attributes: ['name'],
                        where: {
                            ISBN: book.ISBN
                        },
                        raw: true
                    })
                    .then(authorList => book.authorList = authorList)
                    .catch(err => console.log(err));
            }

            return res.render('cart', {
                title: "Cart",
                books: books
            });
        })
        .catch(err => console.log(err));
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

module.exports.remove = (req, res) => {
    Cart.findOne({
            attributes: ['quantity'],
            raw: true,
            where: {
                [Op.and]: [{
                        customerId: req.user.id
                    },
                    {
                        ISBN: req.query.ISBN
                    }
                ]
            }
        })
        .then(cart => {
            if (cart.quantity > 1) {
                return Cart.decrement('quantity', {
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
                    })
                    .then(() => res.redirect('back'))
                    .catch(err => console.log(err));
            } else {
                return Cart.destroy({
                        where: {
                            [Op.and]: [{
                                    customerId: req.user.id
                                },
                                {
                                    ISBN: req.query.ISBN
                                }
                            ]
                        }
                    })
                    .then(() => res.redirect('back'))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}