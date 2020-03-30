//const gerenerateUniqueId = require('../utils/generateUniqueId');
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const propietarios = await connection('propietario').select('*');
    
        return response.json(propietarios);
        },

    async create(request, response) {
        const {Nome_Completo, email, whatsapp, senha } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('propietario').insert({
            id,
            Nome_Completo,
            email,
            whatsapp,
            senha,
            
        })
            return response.json({ id });
    }
};

