import React, { useEffect, useState } from 'react';
import api from '../services/api';

const HistoricoCompras = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      const response = await api.get('/historico-compra');
      setHistorico(response.data);
    };

    fetchHistorico();
  }, []);

  return (
    <div>
      <h1>Histórico de Compras</h1>
      <ul>
        {historico.map(item => (
          <li key={item.id}>
            {item.Produto.nome} - {item.Quantidade} unidades compradas de {item.Fornecedor.nome} em {item.dataCompra}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoricoCompras;
