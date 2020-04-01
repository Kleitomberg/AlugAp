import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Register(){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const history = useHistory();
    
    const propietarioId = localStorage.getItem('propietarioId');
    
    async function handleNewImovel(e){
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor,
        };

        try{
            await api.post('imoveis', data, {
                headers:{
                    Authorization: propietarioId,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }


    return (
        <div className="newInsidents-container">  
            <div className="content"> 
                <section> 
                    <img src={ logoImg } alt="AlugAp"/>
                    <h1> Cadastrar Imóvel</h1>
                    <p> Descreva as informações do imóvel que deseja vender ou alugar. </p>

                    <Link className="back-link" to="/profile"> 
                            <FiArrowLeft size = {16} color="#EB611D"/>
                        Voltar para home
                        </Link>
                </section>

            <form onSubmit={handleNewImovel}> 
                <input
                 placeholder="Titulo" 
                value={titulo}
                onChange={ e => setTitulo(e.target.value)}
                 />
                <textarea 
                placeholder="Descrição"
                value={descricao}
                onChange={ e => setDescricao(e.target.value)}
                />
                <input 
                placeholder="Valor em R$"
                value={valor}
                onChange={ e => setValor(e.target.value)}
                />

                <button className="button" type="submit"> Cadastrar </button>
            </form>
             </div>
        </div>

    );
}