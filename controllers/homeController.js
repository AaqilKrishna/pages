const {
    Op
} = require("sequelize");
const Book = require('../models/book');
const BookAuthor = require('../models/author');
const Cart = require('../models/cart');

module.exports.home = (req, res) => {
    Book.findAll({
            attributes: ['ISBN', 'title', 'price', 'discount', 'publisher', 'image'],
            raw: true
        })
        .then(async books => {
            for (let book of books) {
                await BookAuthor.findAll({
                        attributes: ['name'],
                        where: {
                            ISBN: book.ISBN
                        },
                        raw: true
                    })
                    .then(authorList => book.authorList = authorList)
                    .catch(err => console.log(err));

                if (!(req.user == undefined)) {
                    await Cart.findOne({
                            where: {
                                [Op.and]: [{
                                        customerId: req.user.id
                                    },
                                    {
                                        ISBN: book.ISBN
                                    }
                                ]
                            },
                            raw: true
                        })
                        .then(cartInfo => {
                            if (cartInfo == null)
                                book.addedToCart = false;
                            else
                                book.addedToCart = true;

                        })
                        .catch(err => console.log(err));
                }
            }
            return books;
        })
        .then(books => {
            return res.render('home', {
                title: "Home",
                books: books
            });
        })
        .catch(err => console.log(err));
}