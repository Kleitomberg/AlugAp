import React from 'react';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewImovel from './pages/NewImovel';
import EditImovel from './pages/EditImovel';

export default function Routes(){
return(
    <BrowserRouter> 
    <Switch >
        <Route exact path="/" exact component={Login} />
        <Route exact  path="/register" component={Register} />

        <Route exact  path="/profile" component={Profile} />
        <Route exact  path="/imoveis" component={NewImovel} />
        <Route exact path="/imoveis/edit" component={EditImovel} />
         </Switch>
    </BrowserRouter> 
);
}