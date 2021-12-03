const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const Author = sequelize.define('author', {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
});

Author.removeAttribute('id');

module.exports = Author;