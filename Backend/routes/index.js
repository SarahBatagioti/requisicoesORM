const express = require('express');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');
const Venda = require('../models/Venda');

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

// CRUD de Fornecedores
router.post('/fornecedores', async (req, res) => {
  const fornecedores = await Fornecedor.create(req.body);
  res.status(201).json(fornecedores);
});

router.get('/fornecedores', async (req, res) => {
  const fornecedores = await Fornecedor.findAll();
  res.json(fornecedores);
});

router.get('/fornecedores/:id', async (req, res) => {
  const fornecedore = await Fornecedor.findByPk(req.params.id);
  res.json(fornecedore);
});

router.delete('/fornecedores/:id', async (req, res) => {
  await Fornecedor.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

// Create e Read da Venda
router.post('/venda', async (req, res) => {
  const vendas = await Venda.create(req.body);
  res.status(201).json(vendas);
});

router.get('/venda', async (req, res) => {
  try {
    // Buscar todas as vendas com os relacionamentos
    const vendas = await Venda.findAll({
      include: [
        { model: Produto, include: [Fornecedor] },
        { model: Cliente }
      ]
    });

    // Agrupar vendas por cliente
    const historicoPorCliente = vendas.reduce((acc, venda) => {
      const clienteId = venda.cliente.id;

      if (!acc[clienteId]) {
        acc[clienteId] = {
          cliente: venda.cliente.nome,
          compras: [],
        };
      }

      acc[clienteId].compras.push({
        produto: venda.produto.nome,
        preco: venda.produto.preco,
        fornecedor: venda.produto.fornecedor.nome,
        data: venda.createdAt,
      });

      return acc;
    }, {});

    router.get('/clientes/:id/produtos', async (req, res) => {
      try {
        const cliente = await Cliente.findByPk(req.params.id, {
          include: {
            model: Produto, // Modelo associado
            through: { attributes: [] }, // Evita dados extras da tabela de junção
          },
        });

        if (!cliente) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.json(cliente.Produtos); // Retorna os produtos do cliente
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produtos do cliente' });
      }
    });

    // Retornar o histórico agrupado
    res.json(Object.values(historicoPorCliente));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar vendas.' });
  }
});

router.delete('/venda/:id', async (req, res) => {
  await Venda.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

// Relacionamento: Consultar Produtos de um Cliente
router.get('/clientes/:id/produtos', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id, {
    include: Produto
  });
  res.json(cliente.produtos);
});

module.exports = router;