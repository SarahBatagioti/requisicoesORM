# Utilize uma ferramenta como Insomnia ou Thunder Client para testar as rotas:

## Clientes:
```bash
    - `POST /api/clientes`: Cria um cliente.
    - `GET /api/clientes`: Lista todos os clientes.
    - `GET /api/clientes/:id`: Obtém um cliente específico.
    - `PUT /api/clientes/:id`: Atualiza um cliente específico.
    - `DELETE /api/clientes/:id`: Deleta um cliente específico.
```

## Produtos:
```bash
    - `POST /api/produtos`: Cria um produto.
    - `GET /api/produtos`: Lista todos os produtos.
    - `GET /api/produtos/:id`: Obtém um produto específico.
    - `PUT /api/produtos/:id`: Atualiza um produto específico.
    - `DELETE /api/produtos/:id`: Deleta um produto específico.
```

## Consultar Produtos de um Cliente**:
```bash
    - `GET /api/clientes/:id/produtos`: Lista todos os produtos associados a um cliente específico.
```