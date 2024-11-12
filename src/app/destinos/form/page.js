'use client'

import { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Pagina from '@/app/components/Pagina'

export default function CadastroDestinos() {
  const [clientes, setClientes] = useState([])  // Lista de clientes cadastrados
  const [destinos, setDestinos] = useState([])  // Lista de destinos cadastrados
  const [clienteSelecionado, setClienteSelecionado] = useState('') // Cliente selecionado para associar a um destino
  const [nomeDestino, setNomeDestino] = useState('')  // Nome do destino
  const [descricaoDestino, setDescricaoDestino] = useState('')  // Descrição do destino
  const [dataChegada, setDataChegada] = useState('')  // Data de chegada do destino
  const [duracaoViagem, setDuracaoViagem] = useState('')  // Duração da viagem
  const [orçamento, setOrçamento] = useState('')  // Orçamento estimado
  const [atividadePrincipal, setAtividadePrincipal] = useState('')  // Atividade principal no destino
  const [destinoPopular, setDestinoPopular] = useState(false)  // Se o destino é popular
  const [urlImagem, setUrlImagem] = useState('')  // URL da imagem do destino

  const router = useRouter()  // Navegação

  useEffect(() => {
    // Recupera os clientes e destinos do localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || []
    const destinos = JSON.parse(localStorage.getItem('destinos')) || []
    setClientes(clientes)
    setDestinos(destinos)
  }, [])

  // Função para salvar o destino no localStorage
  function salvarDestino(e) {
    e.preventDefault()

    // Busca o objeto completo do cliente a partir do clienteSelecionado (ID)
    const cliente = clientes.find(c => c.id === parseInt(clienteSelecionado))

    // Cria um novo destino com um ID único e o objeto do cliente completo
    const novoDestino = {
      id: new Date().getTime(),  // Gera um ID único com base no timestamp
      nomeDestino,
      descricaoDestino,
      dataChegada,
      duracaoViagem,
      orçamento,
      atividadePrincipal,
      destinoPopular,
      urlImagem,
      cliente // Salva o objeto completo do cliente
    }

    // Atualiza a lista de destinos e salva no localStorage
    const destinosAtualizados = [...destinos, novoDestino]
    localStorage.setItem('destinos', JSON.stringify(destinosAtualizados))
    setDestinos(destinosAtualizados)

    // Exibe uma mensagem de sucesso
    alert("Destino cadastrado com sucesso!")

    // Redireciona para a página de listagem de destinos
    router.push('/destinos')
  }

  return (
    <Pagina>
      <Container className="my-4">
        <Card className="p-4 shadow-lg rounded">
          <Card.Body>
            <h3 className="text-center mb-4">Cadastro de Destinos</h3>

            {/* Formulário de Destino */}
            <Form onSubmit={salvarDestino}>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Nome do Destino:</Form.Label>
                  <Form.Control
                    type="text"
                    value={nomeDestino}
                    onChange={(e) => setNomeDestino(e.target.value)}
                    placeholder="Digite o nome do destino"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Descrição do Destino:</Form.Label>
                  <Form.Control
                    type="text"
                    value={descricaoDestino}
                    onChange={(e) => setDescricaoDestino(e.target.value)}
                    placeholder="Descreva o destino"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Data de Chegada:</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataChegada}
                    onChange={(e) => setDataChegada(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Duração da Viagem:</Form.Label>
                  <Form.Control
                    type="number"
                    value={duracaoViagem}
                    onChange={(e) => setDuracaoViagem(e.target.value)}
                    placeholder="Em dias"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Orçamento Estimado:</Form.Label>
                  <Form.Control
                    type="number"
                    value={orçamento}
                    onChange={(e) => setOrçamento(e.target.value)}
                    placeholder="Em reais"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Atividade Principal:</Form.Label>
                  <Form.Control
                    type="text"
                    value={atividadePrincipal}
                    onChange={(e) => setAtividadePrincipal(e.target.value)}
                    placeholder="Atividade principal no destino"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Destino Popular?</Form.Label>
                  <Form.Check
                    type="checkbox"
                    checked={destinoPopular}
                    onChange={(e) => setDestinoPopular(e.target.checked)}
                    label="Marque se for um destino popular"
                  />
                </Form.Group>
              </Row>

              {/* Campo de URL da Imagem */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>URL da Imagem:</Form.Label>
                  <Form.Control
                    type="text"
                    value={urlImagem}
                    onChange={(e) => setUrlImagem(e.target.value)}
                    placeholder="Cole a URL da imagem do destino"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-4">
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

              <Row className="text-center">
                {/* Botões */}
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => router.push('/destinos')}>
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