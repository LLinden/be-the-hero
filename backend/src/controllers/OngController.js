const crypto = require('crypto');
const connection = require('../database/conection');

module.exports = {
    async index(request, response) {
        // retorna todos os dados de ongs
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        //const data = request.body;
        // pode ser dividida para salvar cada dado numa variável:
        const { name, email, whatsapp, city, uf } = request.body;

        // gera 4 bytes de caracteres aleatórios e converte para string hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');

        // cadastrar a ong, conexão com o bd
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        // retorna o id para a ong para ela saber o cadastro dela
        return response.json({ id })
    }
};