const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

class HistoricoCompras extends Model { }

HistoricoCompras.init({
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataCompra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, { sequelize, modelName: 'historicoCompras' });

// Relacionamentos
HistoricoCompras.belongsTo(Produto); // Cada histórico está associado a um produto
Produto.hasMany(HistoricoCompras);

HistoricoCompras.belongsTo(Fornecedor); // Cada histórico está associado a um fornecedor
Fornecedor.hasMany(HistoricoCompras);

module.exports = HistoricoCompras;
