'use client'

import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import Pagina from '../components/Pagina'


export default function Tabela() {
  const [relacoes, setRelacoes] = useState([])  // Lista de relações
  const [clientes, setClientes] = useState([])   // Lista de clientes
  const [destinos, setDestinos] = useState([])   // Lista de destinos

  useEffect(() => {
    // Recupera os dados do localStorage ou inicia com listas vazias
    const relacoesLocalStorage = JSON.parse(localStorage.getItem('relacoes')) || []
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []
    const destinosLocalStorage = JSON.parse(localStorage.getItem('destinos')) || []

    // Atualiza o estado com as listas
    setRelacoes(relacoesLocalStorage)
    setClientes(clientesLocalStorage)
    setDestinos(destinosLocalStorage)

    // Log para verificar se os dados estão corretos
    console.log('Relações:', relacoesLocalStorage)
    console.log('Clientes:', clientesLocalStorage)
    console.log('Destinos:', destinosLocalStorage)
  }, [])

  // Função para excluir a relação
  function excluir(id) {
    if (window.confirm('Deseja realmente excluir esta relação?')) {
      const novasRelacoes = relacoes.filter(relacao => relacao.id !== id)
      localStorage.setItem('relacoes', JSON.stringify(novasRelacoes))
      setRelacoes(novasRelacoes)
      alert('Relação excluída com sucesso!')
    }
  }

  return (
    <Pagina titulo={"Lista de Reservas"}>
      <div className='text-end mb-2'>
        <Button href='/reservas/form'>
          <FaPen /> Nova Reserva
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Data Reserva</th>
            <th>Número de Pessoas</th>
            <th>Status</th>
            <th>Comentários</th>
            <th>Forma de Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {relacoes.map(relacao => {
            // Buscar o cliente e o destino correspondente usando os IDs
            const cliente = clientes.find(cli => cli.id === relacao.clienteId)
            const destino = destinos.find(dest => dest.id === relacao.destinoId)

            return (
              <tr key={relacao.id}>
                <td>{cliente ? cliente.nome : 'Cliente não encontrado'}</td>
                <td>{destino ? destino.nomeDestino : 'Destino não encontrado'}</td>
                <td>{relacao.dataReserva}</td>
                <td>{relacao.numeroPessoas}</td>
                <td>{relacao.statusReserva}</td>
                <td>{relacao.comentarios}</td>
                <td>{relacao.formaPagamento}</td>
                <td>
                  <Button className='me-2' href={`/reservas/form?id=${relacao.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant='danger' onClick={() => excluir(relacao.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
