const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

class Produto extends Model {}

Produto.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, { sequelize, modelName: 'produto' });

// Definindo o relacionamento um para muitos
Cliente.hasMany(Produto); // Um cliente tem muitos produtos
Produto.belongsTo(Cliente); // Cada produto pertence a um cliente

module.exports = Produto;