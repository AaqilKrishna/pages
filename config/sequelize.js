require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    },
    "logging": false,
});

module.exports = sequelize;