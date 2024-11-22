const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Fornecedor = require('./Fornecedor'); // Import the Fornecedor model

class Produto extends Model {}

Produto.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fornecedorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fornecedor,
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'produto' }
);

Produto.belongsTo(Fornecedor, { foreignKey: 'fornecedorId' });
Fornecedor.hasMany(Produto, { foreignKey: 'fornecedorId' });

module.exports = Produto;
