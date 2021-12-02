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
    paymentMode: {
        type: DataTypes.STRING
    },
   paymentDate: {
        type: DataTypes.DATEONLY
    },
    deliveryDate: {
        type: DataTypes.DATEONLY
    }
   
});



module.exports = Order;