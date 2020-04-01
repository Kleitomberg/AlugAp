import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import artLogin from '../../assets/Art login.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

   async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('session', { email, senha});
               // localStorage.setItem('propietarioemail', email).And('propietariosenha', senha));
                localStorage.setItem('propietarioName', response.data.Nome_Completo);
                localStorage.setItem('propietarioId', response.data.id);
               
console.log(response.data.id);

            history.push('/profile');
        } catch(err){
            alert('Senha ou E-mail invalido.');
        }
    
   }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="AlugAp"/>

                <form onSubmit={ handleLogin }>
                    <h1> Faça Seu Login</h1>

                    <input 
                    placeholder="Seu E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                     />
                      <input
                      type="password" 
                    placeholder="Sua Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                     />


                    <button  className="button" type="submit"> Entrar </button>

                    <Link className="back-link" to="/register"> 
                        <FiLogIn size = {16} color="#EB611D" />
                     Não tenho Cadastro
                     </Link>
              </form>
             </section>

            <img className="artL" src={ artLogin } alt="artL"/>
        </div>
      );
}
