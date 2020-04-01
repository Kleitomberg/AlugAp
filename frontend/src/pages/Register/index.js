import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [Nome_Completo, setNome_Completo] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [senha, setSenha] = useState('');
    
    const history = useHistory();

    async function handleRegister(e){
    e.preventDefault();

        const data = {
            Nome_Completo,
            email,
            whatsapp,
            senha,
        };

        try{
        await api.post('register', data);
        

        alert('Cadastro Realizado com sucesso.');
        history.push('/');
    } catch (err) {
        alert('Erro no Cadastro, tente novamente.');
    }
}

    return (
        <div className="register-container">  
            <div className="content"> 
                <section> 
                    <img src={ logoImg } alt="AlugAp"/>
                    <h1> Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e comece a divulgar seus imóveis. </p>

                    <Link className="back-link" to="/"> 
                            <FiArrowLeft size = {16} color="#EB611D"/>
                        Voltar para o login
                        </Link>
                </section>

            <form onSubmit={handleRegister}> 

                <input 
                placeholder="Nome Completo"
                value={Nome_Completo}
                onChange= { e => setNome_Completo(e.target.value)}
                 />

                <input 
                type="email" placeholder="E-mail"
                value={email}
                onChange= { e => setEmail(e.target.value)}
                />

                <input 
                placeholder="Whatsapp"
                value={whatsapp}
                onChange= { e => setWhatsapp(e.target.value)}
                />

                    <input
                    type="password"
                     placeholder="Senha"
                    value={senha}
                    onChange= { e => setSenha(e.target.value)}                    
                    />
                  
                <button className="button" type="submit"> Cadastrar </button>
            </form>
             </div>
        </div>

    );
}