const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

// Definindo o modelo de histórico de compras
const HistoricoCompra = sequelize.define('HistoricoCompra', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dataCompra: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relacionamentos
Produto.hasMany(HistoricoCompra);
HistoricoCompra.belongsTo(Produto);

Fornecedor.hasMany(HistoricoCompra);
HistoricoCompra.belongsTo(Fornecedor);

module.exports = HistoricoCompra;
