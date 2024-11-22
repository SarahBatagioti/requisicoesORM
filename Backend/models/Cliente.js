const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cliente extends Model { }
Cliente.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'cliente' });
module.exports = Cliente;