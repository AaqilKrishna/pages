const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');
const Order = require('./order');
const Category = require('./category');
const Author = require('./author');

const Book = sequelize.define('book', {
    ISBN: {
        type: DataTypes.BIGINT(13),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    noOfPages: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Paperback'
    },
    publisher: {
        type: DataTypes.STRING
    }
});

Book.hasMany(Order, {
    foreignKey: {
        name: 'ISBN',
        allowNull: false
    }
});

Order.belongsTo(Book, {
    foreignKey: {
        name: 'ISBN',
        allowNull: false
    }
});

Book.hasMany(Category, {
    foreignKey: {
        name: 'ISBN',
        primaryKey: true
    },
    onDelete: 'CASCADE'
});

Book.hasMany(Author, {
    foreignKey: {
        name: 'ISBN',
        primaryKey: true
    },
    onDelete: 'CASCADE'
});

module.exports = Book;