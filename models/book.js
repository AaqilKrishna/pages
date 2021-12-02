const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');
const Order = require('./order');

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
        type: DataTypes.DECIMAL(4, 2)
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: DataTypes.STRING
    },
    publisher: {
        type: DataTypes.STRING
    }
});

Book.hasMany(Order, {
    foreignKey: 'ISBN'
});

Order.belongsTo(Book, {
    foreignKey: 'ISBN'
});

module.exports = Book;