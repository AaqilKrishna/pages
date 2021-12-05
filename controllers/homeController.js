const {
    Op
} = require("sequelize");
const Book = require('../models/book');
const BookCategory = require('../models/category');
const BookAuthor = require('../models/author');

module.exports.home = (req, res) => {
    Book.findAll({
            attributes: ['ISBN', 'title', 'price', 'noOfPages', 'discount', 'type', 'publisher', 'image'],
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

                await BookCategory.findAll({
                        attributes: ['name'],
                        where: {
                            ISBN: book.ISBN
                        },
                        raw: true
                    })
                    .then(categoryList => book.categoryList = categoryList)
                    .catch(err => console.log(err));
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
};