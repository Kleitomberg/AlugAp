const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {email, senha } = request.body;

        const propietarios = await connection('propietario')
        .where( 'email', email).andWhere('senha', senha)
        .select('Nome_Completo')
        .first();

    //console.log({email, senha});

        if (!propietarios){
            return response.status(400).json({ error: 'Nenhum usuario foi encontrado!' });
            
        }
        return response.json(propietarios);

    }
}