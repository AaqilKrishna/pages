const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Category.removeAttribute('id');

module.exports = Category;