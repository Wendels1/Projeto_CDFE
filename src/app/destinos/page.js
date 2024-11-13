'use client'

import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import Pagina from '@/app/components/Pagina'

export default function ListagemDestinos() {
  const [destinos, setDestinos] = useState([])  // Lista de destinos cadastrados
  const [clientes, setClientes] = useState([])  // Lista de clientes cadastrados

  useEffect(() => {
    // Recupera os destinos e clientes do localStorage
    const destinosLocalStorage = JSON.parse(localStorage.getItem('destinos')) || []
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []

    setDestinos(destinosLocalStorage)
    setClientes(clientesLocalStorage)
    
    // Log para verificar se os dados estão corretos
    console.log('Destinos:', destinosLocalStorage)
    console.log('Clientes:', clientesLocalStorage)
  }, [])

  // Função para excluir um destino
  function excluirDestino(id) {
    if (window.confirm('Deseja realmente excluir este destino?')) {
      const destinosAtualizados = destinos.filter(destino => destino.id !== id)
      localStorage.setItem('destinos', JSON.stringify(destinosAtualizados))
      setDestinos(destinosAtualizados)
      alert("Destino excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Destinos"}>
      <div className='text-end mb-2'>
        {/* Botão para adicionar um novo destino */}
        <Button href='/destinos/form'><FaPlusCircle /> Novo Destino</Button>
      </div>

      {/* Tabela de Destinos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Nome do Destino</th>
            <th>Descrição</th>
            <th>Data de Chegada</th>
            <th>Duração (dias)</th>
            <th>Orçamento</th>
            <th>Atividade Principal</th>
            <th>Popular</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {destinos.map(destino => {
            // Buscar o cliente correspondente ao destino
            const cliente = clientes.find(cli => cli.id === destino.clienteId)

            return (
              <tr key={destino.id || `destino-${destino.nomeDestino}`}>
                <td>{cliente ? cliente.nome : 'Cliente não encontrado'}</td>
                <td>{destino.nomeDestino}</td>
                <td>{destino.descricaoDestino}</td>
                <td>{destino.dataChegada}</td>
                <td>{destino.duracaoViagem}</td>
                <td>R$ {destino.orçamento}</td>
                <td>{destino.atividadePrincipal}</td>
                <td>{destino.destinoPopular ? 'Sim' : 'Não'}</td>
                <td>
                  {destino.urlImagem ? (
                    <img src={destino.urlImagem} alt={destino.nomeDestino} style={{ width: "100px", height: "auto" }} />
                  ) : (
                    'Imagem não disponível'
                  )}
                </td>
                <td>
                  <Button className='me-2' href={`/destinos/form?id=${destino.id}`}><FaPen /></Button>
                  <Button variant="danger" onClick={() => excluirDestino(destino.id)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
