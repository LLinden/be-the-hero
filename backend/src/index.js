// framework para simplifcar a questão das rotas
const express = require('express');
// modulo de segurança
const cors = require('cors');
// ./ para dizer que é um arquivo . (aqui) + / (diretorio)
const routes = require('./routes');

const app = express();

// no modo de proção, adicionar dentro do cors o origin
app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do backend
 * POST: Criar uma informação no backend
 * PUT: Alterar uma informação no bakcend
 * DELETE: Deletar uma informação no backend
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route Params: Parâmetros utilizados para identificar recusrsos
  * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
  */

  /**
   * SQL: mySQL, SQLite, PostgreSQL, Oracle, etc
   * NoSQL: MongoDB, CouchDB, etc
   */

   /**
    * Driver: SELECT * FROM users
    * Query Builder: table('users').select('*').where()
    */


app.listen(3333);