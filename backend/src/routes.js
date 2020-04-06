// importações
const express = require('express');
// do próprio node. Para criptografia. Será usado para criar uma id string aleatória
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

// login
routes.post('/sessions', SessionController.create);

// para retornar as ongs cadastradas
routes.get('/ongs', OngController.index);

// rota raiz (rota e recurso)
// adicionado o async (e o await no insert) para que o retorno ocorra apenas após o insert
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
// precisa do parametro de qual deletar, ou seja, /:id
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;