'use client'

import { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Pagina from '@/app/components/Pagina'

export default function CadastroRelacao() {
  const [clientes, setClientes] = useState([])  // Lista de clientes cadastrados
  const [destinos, setDestinos] = useState([])  // Lista de destinos cadastrados
  const [clienteSelecionado, setClienteSelecionado] = useState('') // Cliente selecionado
  const [destinoSelecionado, setDestinoSelecionado] = useState('') // Destino selecionado
  const [dataReserva, setDataReserva] = useState('')  // Data da reserva
  const [numeroPessoas, setNumeroPessoas] = useState('')  // Número de pessoas
  const [statusReserva, setStatusReserva] = useState('')  // Status da reserva (ex: Confirmada, Pendente)
  const [comentarios, setComentarios] = useState('')  // Comentários sobre a reserva
  const [formaPagamento, setFormaPagamento] = useState('')  // Forma de pagamento

  const router = useRouter()  // Navegação

  useEffect(() => {
    // Recupera os clientes e destinos do localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || []
    const destinos = JSON.parse(localStorage.getItem('destinos')) || []
    setClientes(clientes)
    setDestinos(destinos)
  }, [])

  // Função para salvar a relação entre cliente e destino no localStorage
  function salvarRelacao(e) {
    e.preventDefault()

    // Cria um novo objeto de reserva
    const novaReserva = {
      id: new Date().getTime(),  // Gera um ID único
      clienteId: clienteSelecionado,
      destinoId: destinoSelecionado,
      dataReserva,
      numeroPessoas,
      statusReserva,
      comentarios,
      formaPagamento
    }

    // Recupera as relações existentes e adiciona a nova reserva
    const relacoes = JSON.parse(localStorage.getItem('relacoes')) || []
    const novasRelacoes = [...relacoes, novaReserva]
    localStorage.setItem('relacoes', JSON.stringify(novasRelacoes))

    // Exibe uma mensagem de sucesso
    alert("Relação entre cliente e destino cadastrada com sucesso!")

    // Redireciona para a página de listagem
    router.push('/reservas')
  }

  return (
    <Pagina>
      <Container className="my-4">
        <Card className="p-4 shadow-lg rounded">
          <Card.Body>
            <h3 className="text-center mb-4">Cadastro de Relação Cliente - Destino</h3>

            {/* Formulário de Relação */}
            <Form onSubmit={salvarRelacao}>
              {/* Cliente Selecionado */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Selecione um Cliente:</Form.Label>
                  <Form.Select
                    value={clienteSelecionado}
                    onChange={(e) => setClienteSelecionado(e.target.value)}
                  >
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              {/* Destino Selecionado */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Selecione um Destino:</Form.Label>
                  <Form.Select
                    value={destinoSelecionado}
                    onChange={(e) => setDestinoSelecionado(e.target.value)}
                  >
                    <option value="">Selecione um destino</option>
                    {destinos.map(destino => (
                      <option key={destino.id} value={destino.id}>
                        {destino.nomeDestino}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              {/* Data da Reserva */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Data da Reserva:</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataReserva}
                    onChange={(e) => setDataReserva(e.target.value)}
                  />
                </Form.Group>
              </Row>

              {/* Número de Pessoas */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Número de Pessoas:</Form.Label>
                  <Form.Control
                    type="number"
                    value={numeroPessoas}
                    onChange={(e) => setNumeroPessoas(e.target.value)}
                    placeholder="Quantidade de pessoas"
                  />
                </Form.Group>
              </Row>

              {/* Status da Reserva */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Status da Reserva:</Form.Label>
                  <Form.Control
                    type="text"
                    value={statusReserva}
                    onChange={(e) => setStatusReserva(e.target.value)}
                    placeholder="Exemplo: Confirmada, Pendente"
                  />
                </Form.Group>
              </Row>

              {/* Comentários */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Comentários:</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                    placeholder="Comentários sobre a reserva"
                  />
                </Form.Group>
              </Row>

              {/* Forma de Pagamento */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Forma de Pagamento:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formaPagamento}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                    placeholder="Exemplo: Cartão de Crédito, Boleto"
                  />
                </Form.Group>
              </Row>

              <Row className="text-center">
                {/* Botões */}
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => router.push('/reservas')}>
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button variant="primary" type="submit">
                    <FaCheck /> Salvar
                  </Button>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Pagina>
  )
}
