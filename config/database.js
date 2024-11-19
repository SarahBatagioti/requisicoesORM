const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('orm', 'root', 'fatec', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

