import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState({
    fornecedores: [],
    produtos: [],
    clientes: [],
    vendas: [],
  });
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    fornecedorId: '',
    clienteId: '',
    quantidade: '',
  });
  const [activeTab, setActiveTab] = useState('fornecedores');

  const fetchData = async (endpoint, stateKey) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados de ${stateKey}`);
      }
      const data = await response.json();
      setData((prevState) => ({ ...prevState, [stateKey]: data }));
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData('fornecedores', 'fornecedores');
    fetchData('produtos', 'produtos');
    fetchData('clientes', 'clientes');
    fetchData('venda', 'vendas');
  }, []);

  const handleSubmit = async (endpoint, method, body) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição');
      }
  
      // Atualiza os dados após o POST bem-sucedido
      if (method === 'POST' && endpoint === 'venda') {
        fetchData('venda', 'vendas'); // Atualiza as vendas
      } else {
        fetchData(endpoint, endpoint); // Atualiza o endpoint correspondente
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar a operação.');
    }
  };  


  return (
    <div>
      <h1>Gerenciamento</h1>
      <nav>
        <button onClick={() => setActiveTab('fornecedores')}>Fornecedores</button>
        <button onClick={() => setActiveTab('produtos')}>Produtos</button>
        <button onClick={() => setActiveTab('clientes')}>Clientes</button>
        <button onClick={() => setActiveTab('vendas')}>Vendas</button>
      </nav>

      <div>
        {activeTab === 'fornecedores' && (
          <div>
            <h2>Fornecedores</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('fornecedores', 'POST', { nome: form.nome });
                setForm({ ...form, nome: '' });
              }}
            >
              <input
                type="text"
                placeholder="Nome do Fornecedor"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              <button type="submit">Criar</button>
            </form>
            <ul>
              {data.fornecedores.map((f) => (
                <li key={f.id}>{f.nome}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'produtos' && (
          <div>
            <h2>Produtos</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('produtos', 'POST', {
                  nome: form.nome,
                  preco: parseFloat(form.preco),
                  fornecedorId: parseInt(form.fornecedorId),
                });
                setForm({ ...form, nome: '', preco: '', fornecedorId: '' });
              }}
            >
              <input
                type="text"
                placeholder="Nome do Produto"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              <input
                type="number"
                placeholder="Preço"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: e.target.value })}
              />
              <select
                value={form.fornecedorId}
                onChange={(e) =>
                  setForm({ ...form, fornecedorId: e.target.value })
                }
              >
                <option value="">Selecione o Fornecedor</option>
                {data.fornecedores.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>
              <button type="submit">Criar</button>
            </form>
            <ul>
              {data.produtos.map((p) => (
                <li key={p.id}>
                  {p.nome} - R$ {p.preco.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'clientes' && (
          <div>
            <h2>Clientes</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('clientes', 'POST', { nome: form.nome });
                setForm({ ...form, nome: '' });
              }}
            >
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              <button type="submit">Criar</button>
            </form>
            <ul>
              {data.clientes.map((c) => (
                <li key={c.id}>{c.nome}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'vendas' && (
          <div>
            <h2>Registrar Venda</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('venda', 'POST', {
                  produtoId: parseInt(form.produtoId),
                  clienteId: parseInt(form.clienteId),
                  quantidade: parseInt(form.quantidade),
                  total: parseFloat(form.total),
                });
                setForm({ ...form, produtoId: '', clienteId: '', quantidade: '', total: '' });
              }}
            >
              <select
                value={form.produtoId}
                onChange={(e) => setForm({ ...form, produtoId: e.target.value })}
              >
                <option value="">Selecione o Produto</option>
                {data.produtos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
              <select
                value={form.clienteId}
                onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
              >
                <option value="">Selecione o Cliente</option>
                {data.clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantidade"
                value={form.quantidade}
                onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
              />
              <input
                type="number"
                placeholder="Total"
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
              />
              <button type="submit">Registrar Venda</button>
            </form>

            <h3>Histórico de Compras</h3>
            <div>
              {data.vendas?.map((cliente) => (
                <div key={cliente.cliente}>
                  <h4>Cliente: {cliente.cliente}</h4>
                  <ul>
                    {cliente.compras.map((compra, index) => (
                      <li key={index}>
                        Produto: {compra.produto}, Preço: {compra.preco}, Fornecedor: {compra.fornecedor},
                        Compra feita em: {new Date(compra.data).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
