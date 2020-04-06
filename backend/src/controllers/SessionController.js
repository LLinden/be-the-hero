const connection = require('../database/conection');

module.exports = {
    async create(request, response) {
        // busca o id da ong através do cropo da requisição
        const { id } = request.body;

        // busca a ong do bd
        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID'})
        }

        return response.json(ong);
    }
}