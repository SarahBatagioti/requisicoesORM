const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Fornecedor extends Model {}

Fornecedor.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'fornecedor' });

module.exports = Fornecedor;