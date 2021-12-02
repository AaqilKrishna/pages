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
        validate: {
            notEmpty: true
        }
    },
    paymentmode: {
        type: DataTypes.STRING
    },
   paymentdate: {
        type: DataTypes.DATE
    },
    deliverydate: {
        type: DataTypes.DATE
    }
   
});

module.exports = Order;