import React, {useEffect, useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
//import { FiPower, FiTrash2, EditIcon } from 'react-icons/fi';
import { 
    FiPower as LogoutIcon,
    FiTrash2 as TrashIcon,
    FiEdit as EditIcon
  } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [imoveis, setImoveis] = useState([]);
 
    const history = useHistory();

    const propietarioId = localStorage.getItem('propietarioId');
    const propietarioName = localStorage.getItem('propietarioName');

    useEffect(() => {
        api.get('/profile', {
          headers:{
          Authorization: propietarioId,
            }
        }).then(response => {
            setImoveis(response.data);
        })
    }, [propietarioId]);

    function handleImovelUpdate (id) {
        const imovel =
          imoveis.find(imovel =>
            imovel.id === id
          )
        
        history.push('/imoveis/edit', { imovel });
      }



    async function handleDeleteImovel(id) {
        try {
                await api.delete(`imoveis/${id}`, {
                    headers: {
                        Authorization: propietarioId,
                    }
                });

                setImoveis(imoveis.filter(imovel=> imovel.id !== id));     
        } catch (err) {
        alert('Erro ao deletar imóvel, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            
            <header> 
                <img className="artL" src={logoImg} alt="AlugAp"/>
                <span> Bem-Vindo,  { propietarioName }</span>

                 <Link className="button" to="/imoveis"> Cadastrar novo imóvel</Link>
                <button onClick={handleLogout} type="button">
                    <LogoutIcon size = {18} color="#EB611D"/>
                 </button>
            </header>
            
            <h1> Meus Imóveis </h1>

            <ul> 
                 { imoveis.map(imovel => (
                         <li key={imovel.id}>
                         <strong> Caso: </strong>
                         <p> {imovel.titulo}</p>
     
                         <strong> Dscrição: </strong>
                         <p> {imovel.descricao}</p>
     
                         <strong> Valor: </strong>
                         <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(imovel.valor)}</p>
     
                         <section className="actions">  

                         <button onClick={() => handleImovelUpdate(imovel.id)}>
                        <EditIcon size={20} color="#a8a8b3"/>
                        </button>

                         <button onClick={() => handleDeleteImovel(imovel.id)} type="button"> 
                         <TrashIcon size={ 20} color="#a8a8b3" />
                         </button>
                         </section>
                         
                              </li>  
                 ))}                
            </ul>
         </div>
    );
}