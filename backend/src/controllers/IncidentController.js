const connection = require('../database/conection');

// exportar um objeto
module.exports = {
    async index(request, response) {
        // paginação. Inicia na 1
        const { page = 1 } = request.query;

        // total de casos
        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            // join do sql, relacionar dados de duas tabelas. Trazer dados da tabela de ongs também
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            // numero de reg. por página
            .limit(5)
            // pula os 5 primeiros registros e pega os proximos 5 registros
            .offset((page - 1) * 5)
            // todos os dados da tabela incidents, porém só alguns específicos da tabela ong
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // para passar o total no cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        // o que é preciso para cadastrar um incident (id gera automático)
        const { title, description, value } = request.body;

        // dados da autenticacao, localização, contexto em geral vem no header
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            // retorna apenas um resultado
            .first();

        // para que só seja possível deletar incidente da própria ong
        if (incident.ong_id != ong_id) {
            // retorna 401 = não autorizado
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        // deleta o registro da tabela
        await connection('incidents').where('id', id).delete();

        // retorna resposta que não tem conteúdo = 204
        return response.status(204).send();
    }
};