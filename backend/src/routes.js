const express = require('express');

const propietarioController = require('./controllers/propietarioController');
const imovelController = require('./controllers/imovelController');
const perfilControler = require('./controllers/perfilControler');
const loginController = require('./controllers/loginController');


const routes = express.Router();

routes.post('/session', loginController.create);

routes.get('/propietarios', propietarioController.index);
routes.post('/propietarios', propietarioController.create);

routes.get('/imoveis', imovelController.index);
routes.post('/imoveis', imovelController.create);

routes.delete('/imoveis/:id', imovelController.delete);   

routes.get('/profile', perfilControler.index);
    
    module.exports = routes;
