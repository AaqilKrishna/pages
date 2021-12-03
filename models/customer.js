const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');
const Order = require('./order');

const Customer = sequelize.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    phoneNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    locality: {
        type: DataTypes.STRING
    },
    pincode: {
        type: DataTypes.INTEGER
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
});

Customer.hasMany(Order, {
    foreignKey: {
        allowNull: false
    }
});
Order.belongsTo(Customer, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Customer;