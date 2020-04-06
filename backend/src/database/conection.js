const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

// exporta a conexão com o bd para ser importado desntro dos arquivos onde é preciso se comunicar com o bd
module.exports = connection;