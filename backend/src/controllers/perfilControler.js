const connection = require('../database/connection');

module.exports = {
    async index( request, response){
        const propietario_id = request.headers.authorization;   
    
    const imovel = await connection('imoveis')
    .where('propietario_id', propietario_id)
    .select('*');

    return response.json(imovel);
    }
}