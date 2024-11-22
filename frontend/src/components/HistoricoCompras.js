import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoricoCompras = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/historico-compras')
      .then((response) => {
        setHistorico(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar o histórico:', error);
      });
  }, []);

  return (
    <div>
      <h1>Histórico de Compras</h1>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Fornecedor</th>
            <th>Quantidade</th>
            <th>Data da Compra</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item) => (
            <tr key={item.id}>
              <td>{item.produto.nome}</td>
              <td>{item.fornecedor.nome}</td>
              <td>{item.quantidade}</td>
              <td>{new Date(item.dataCompra).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricoCompras;
