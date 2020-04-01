import React from 'react'
import { useFields } from '../../hooks/useFields'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft as ArrowLeftIcon } from 'react-icons/fi'
import api from '../../services/api'

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function EditImovel ({ location }) {
  const [fields, setFields] = useFields({ ...location.state.imovel })

  const propietarioId = localStorage.getItem('propietarioId');
  const history = useHistory()

  async function handleEditImovel (e) {
    e.preventDefault()

    try {
      await api.put(`/imoveis/${fields.id}`, fields, {
        headers: {
          Authorization: propietarioId
        }
      })

      history.push('/profile')

    } catch (err) {
      alert('Error, please try to edit again.')
    }
  }

  function updateFields ({ target }) {
    setFields(target)
  }

  return (
    <div className="edit-incident-container container">
      <div className="content neumorphism">
        <section>

        <img src={logoImg} alt="AlugAp" />
          
          <h1>Editar Imovel</h1>

          <p>
            Adicione as informações que deseja alterar.
          </p>

          <Link className="back-link" to="/profile">
            <ArrowLeftIcon size={16} color="#EB611D" />
            Voltar para home
          </Link>
         
        </section>
        
        <form onSubmit={handleEditImovel}>
          <input
            name="titulo"
            type="text"
            placeholder="titulo"
            value={fields.titulo}
            onChange={updateFields}
            required
          />
          
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={fields.descricao}
            onChange={updateFields}
            required
          ></textarea>

          <input
            name="valor"
            type="text"
            placeholder="Valor"
            value={fields.valor}
            onChange={updateFields}
            required
          />

          <button className="button">Salvar Alterações</button>
        </form>
      </div>
    </div>
  )
}