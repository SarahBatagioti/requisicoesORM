const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar o CORS
const sequelize = require('./config/database');
const routes = require('./routes/index');

const app = express();

app.use(cors()); // Ativar o CORS
app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
  });
}).catch(err => console.log(err));
