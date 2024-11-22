const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');
const Cliente = require('./Cliente');

class Venda extends Model {}

Venda.init(
  {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: 'id',
      },
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id',
      },
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'venda',
  }
);

// Relationships
Venda.belongsTo(Produto, { foreignKey: 'produtoId' });
Venda.belongsTo(Cliente, { foreignKey: 'clienteId' });
Produto.hasMany(Venda, { foreignKey: 'produtoId' });
Cliente.hasMany(Venda, { foreignKey: 'clienteId' });

module.exports = Venda;