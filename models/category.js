const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
});

Category.removeAttribute('id');

module.exports = Category;