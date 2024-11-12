'use client'

import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import Pagina from '@/app/components/Pagina'

// Simulação de clientes
const clientes = [
  { id: "60a65f92-89b9-4502-a1f6-467890ccc1e6", nome: "Wendel Ferreira Santos" },
  { id: "af23fbd3-df12-489d-80a5-f7853c99dbac", nome: "Maria Souza" }
];

export default function DestinosPage() {
  const [destinos, setDestinos] = useState([])

  // Carrega os destinos do localStorage ao acessar a página
  useEffect(() => {
    const destinosLocalStorage = JSON.parse(localStorage.getItem("destinos")) || []

    // Mapeia os destinos para incluir o nome do cliente
    const destinosComClientes = destinosLocalStorage.map(destino => {
      const cliente = clientes.find(c => c.id === destino.clienteId);
      return {
        ...destino,
        clienteNome: cliente ? cliente.nome : "Cliente não encontrado"
      }
    })

    setDestinos(destinosComClientes)
    console.log(destinosComClientes)
  }, [])

  // Função para excluir um destino
  function excluir(destino) {
    if (window.confirm(`Deseja realmente excluir o destino ${destino.nomeDestino}?`)) {
      const novaLista = destinos.filter(item => item.id !== destino.id)
      localStorage.setItem('destinos', JSON.stringify(novaLista))
      setDestinos(novaLista)
      alert("Destino excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Destinos"}>
      <div className='text-end mb-2'>
        {/* Botão para adicionar um novo destino */}
        <Button href='/destinos/form'><FaPlusCircle /> Novo Destino</Button>
      </div>

      {/* Tabela de destinos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Nome do Destino</th>
            <th>Descrição</th>
            <th>Data de Chegada</th>
            <th>Duração (dias)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {destinos.map(destino => (
            <tr key={destino.id}>
              <td>{destino.clienteNome}</td>
              <td>{destino.nomeDestino}</td>
              <td>{destino.descricaoDestino}</td>
              <td>{destino.dataChegada}</td>
              <td>{destino.duracaoViagem}</td>
              <td className='text-center'>
                {/* Ações de editar e excluir */}
                <Button href={`/destinos/${destino.id}`} className='btn btn-primary me-2'><FaPen /></Button>
                <Button className='btn btn-danger' onClick={() => excluir(destino)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
