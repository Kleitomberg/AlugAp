const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('imoveis').count();
        //console.log(count);


        const imoveis = await connection('imoveis')
        .join('propietario', 'propietario.id', '=', 'imoveis.propietario_id')
        .limit(5)
        .offset((page -1) * 5)
        .select([
            'imoveis.*',
            'propietario.Nome_Completo',
            'propietario.email',
            'propietario.whatsapp'           
            ]);


        response.header('X-total-count', count['count(*)']);
        return response.json(imoveis);
    },

    async create(request, response){
        const { titulo, descricao, valor  } = request.body;
        const propietario_id = request.headers.authorization;

        const [ id ] = await connection('imoveis').insert({
            titulo,
            descricao,
            valor,
            propietario_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const propietario_id = request.headers.authorization;

        const imovel = await connection('imoveis')
        .where('id', id)
        .select('propietario_id')
        .first();

        if (imovel.propietario_id !== propietario_id){
            return response.status(401).json({ error: 'Operation not permited.' });
        }
        await connection('imoveis').where('id', id).delete();

        return response.status(204).send();

    }
};