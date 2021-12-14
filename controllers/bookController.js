const {
    Op
} = require("sequelize");
const Book = require('../models/book');
const Cart = require('../models/cart');
const BookCategory = require('../models/category');
const BookAuthor = require('../models/author');

module.exports.book = (req, res) => {
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

module.exports.bookSingle = (req, res) => {
    Book.findByPk(req.params.ISBN, {
            attributes: ['ISBN', 'title', 'noOfPages', 'price', 'discount', 'type', 'publisher', 'image', ],
            raw: true
        })
        .then(async book => {
            await BookAuthor.findAll({
                    attributes: ['name'],
                    where: {
                        ISBN: book.ISBN
                    },
                    raw: true
                })
                .then(authorList => {
                    book.authorList = authorList;
                })
                .catch(err => console.log(err));

            await BookCategory.findAll({
                    attributes: ['name'],
                    where: {
                        ISBN: book.ISBN
                    },
                    raw: true
                })
                .then(categoryList => {
                    book.categoryList = categoryList;
                })
                .catch(err => console.log(err));

            return book;
        })
        .then(book => {
            return res.render('bookSingle', {
                title: "Pages",
                book: book
            });
        })
        .catch(err => console.log(err));
}