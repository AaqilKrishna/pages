const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');
const Book = require('./book');
const Customer = require('./customer');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate : {
            notEmpty : true
        }
    }
});

Cart.removeAttribute('id');

Customer.belongsToMany(Book, { 
    through: Cart,
    foreignKey: {
        name: 'customerId',
        allowNull: false
    }
});

Book.belongsToMany(Customer, { 
    through: Cart,
    foreignKey: {
        name: 'ISBN',
        allowNull: false
    }
});

module.exports = Cart;