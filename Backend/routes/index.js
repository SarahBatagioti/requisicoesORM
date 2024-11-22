const express = require('express');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const HistoricoCompras = require('../models/HistoricoCompra')
const router = express.Router();

// CRUD para Clientes
router.post('/clientes', async (req, res) => {
  const cliente = await Cliente.create(req.body);
  res.status(201).json(cliente);
});

router.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

router.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  res.json(cliente);
});

router.put('/clientes/:id', async (req, res) => {
  await Cliente.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/clientes/:id', async (req, res) => {
  await Cliente.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

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

// Criar um histórico de compras
router.post('/historico-compras', async (req, res) => {
  const { quantidade, produtoId, fornecedorId } = req.body;
  const historico = await HistoricoCompras.create({
    quantidade,
    produtoId,
    fornecedorId,
  });
  res.status(201).json(historico);
});

// Listar histórico de compras
router.get('/historico-compras', async (req, res) => {
  const historicos = await HistoricoCompras.findAll({
    include: [Produto, Fornecedor],
  });
  res.json(historicos);
});

// Relacionamento: Consultar Produtos de um Cliente
router.get('/clientes/:id/produtos', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id, {
    include: Produto
  });
  res.json(cliente.produtos);
});
module.exports = router;