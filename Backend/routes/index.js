const express = require('express');
const Fornecedor = require('../models/Fornecedor');
const Produto = require('../models/Produto');
const HistoricoCompra = require('../models/HistoricoCompra');

const router = express.Router();

// CRUD para Produtos
router.post('/produtos', async (req, res) => {
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
});

router.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

router.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  res.json(produto);
});

router.put('/produtos/:id', async (req, res) => {
  await Produto.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/produtos/:id', async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

router.post('/fornecedor', async (req, res) => {
  const { nome, cnpj } = req.body;
  const fornecedor = await Fornecedor.create({ nome, cnpj });
  res.json(fornecedor);
});

router.post('/historico-compra', async (req, res) => {
  const { quantidade, dataCompra, produtoId, fornecedorId } = req.body;
  const historicoCompra = await HistoricoCompra.create({
    quantidade,
    dataCompra,
    ProdutoId: produtoId,
    FornecedorId: fornecedorId
  });
  res.json(historicoCompra);
});

router.get('/historico-compra', async (req, res) => {
  const historicoCompras = await HistoricoCompra.findAll({
    include: [Produto, Fornecedor]
  });
  res.json(historicoCompras);
});

// Relacionamento: Consultar Produtos de um Cliente
router.get('/clientes/:id/produtos', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id, {
    include: Produto
  });
  res.json(cliente.produtos);
});

module.exports = router;

