
# Guia de Requisições - API

Este guia apresenta as rotas disponíveis na API para operações CRUD (Create, Read, Update, Delete) e outros endpoints adicionais.

## Requisitos

- Node.js instalado
- Configuração correta do banco de dados e modelos
- Ferramentas de requisição como Postman ou cURL

---

## Endpoints Disponíveis

### Rota do backend
Ao testar use a rota 

http://localhost:3000/api/

### 1. **Clientes**

#### Criar um cliente
**POST** `/clientes`  
Envia um objeto JSON no corpo da requisição.
```json
{
  "id": "1",
  "nome": "Sarah",
}
```

#### Listar todos os clientes
**GET** `/clientes`  

#### Obter um cliente pelo ID
**GET** `/clientes/:id`  

#### Atualizar um cliente
**PUT** `/clientes/:id`  
Envia um objeto JSON no corpo da requisição.

#### Remover um cliente
**DELETE** `/clientes/:id`  

---

### 2. **Produtos**

#### Criar um produto
**POST** `/produtos`  
Envia um objeto JSON no corpo da requisição.
```json
{
  "id": "1",
  "nome": "Maça",
  "preco": 2.0,
  "fornecedorId": 1
}
```

#### Listar todos os produtos
**GET** `/produtos`  

#### Obter um produto pelo ID
**GET** `/produtos/:id`  

#### Atualizar um produto
**PUT** `/produtos/:id`  
Envia um objeto JSON no corpo da requisição.

#### Remover um produto
**DELETE** `/produtos/:id`  

---

### 3. **Fornecedores**

#### Criar um fornecedor
**POST** `/fornecedores`  
Envia um objeto JSON no corpo da requisição.
```json
{
  "id": 1,
  "nome": "Vinicius"
}
```

#### Listar todos os fornecedores
**GET** `/fornecedores`  

#### Obter um fornecedor pelo ID
**GET** `/fornecedores/:id`  

---

### 4. **Vendas**

#### Criar uma venda
**POST** `/venda`  
Envia um objeto JSON no corpo da requisição.
```json
{
  "id": 1,
  "quantidade": 2,
  "produtoId": 1,
  "clienteId": 1,
  "total": 4.0
}
```

#### Obter o histórico de vendas
**GET** `/venda`  

---

### 5. **Relacionamentos**

#### Listar produtos de um cliente
**GET** `/clientes/:id/produtos`  

---

## Observações

- Certifique-se de que o banco de dados esteja configurado corretamente e populado com os dados necessários para os testes.
- Em caso de dúvidas, consulte os logs do servidor ou o código da aplicação.

---

### Contribuições
Contribuições são bem-vindas! Abra uma *issue* ou envie um *pull request*.

