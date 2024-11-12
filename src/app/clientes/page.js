'use client'

import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import Pagina from '../components/Pagina'


export default function ClientesPage() {
  const [clientes, setClientes] = useState([])

  // Carrega os dados dos clientes do localStorage ao acessar a página
  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para excluir um cliente
  function excluir(cliente) {
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className='text-end mb-2'>
        {/* Botão para adicionar um novo cliente */}
        <Button href='/clientes/form'><FaPlusCircle /> Novo Cliente</Button>
      </div>

      {/* Tabela de clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.estado}</td>
                <td>{cliente.cidade}</td>
                <td className='text-center'>
                  {/* Botões de edição e exclusão */}
                  <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
