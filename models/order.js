const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    completion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    paymentMode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cash On Delivery'
    },
    paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deliveryDate: {
        type: DataTypes.DATEONLY
    }
});

module.exports = Order;