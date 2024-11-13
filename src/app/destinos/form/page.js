'use client'

import { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaPlayCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Pagina from '@/app/components/Pagina'
import { Formik } from 'formik'
import * as Yup from 'yup'

export default function CadastroDestinos() {
  const [clientes, setClientes] = useState([])  // Lista de clientes cadastrados
  const [destinos, setDestinos] = useState([])  // Lista de destinos cadastrados

  const router = useRouter()  // Navegação

  useEffect(() => {
    // Recupera os clientes e destinos do localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || []
    const destinos = JSON.parse(localStorage.getItem('destinos')) || []
    setClientes(clientes)
    setDestinos(destinos)
  }, [])

  const initialValues = {
    nomeDestino: '',
    descricaoDestino: '',
    dataChegada: '',
    duracaoViagem: '',
    orçamento: '',
    atividadePrincipal: '',
    destinoPopular: false,
    urlImagem: '',
    clienteSelecionado: ''
  }

  const validationSchema = Yup.object().shape({
    nomeDestino: Yup.string().required("Campo obrigatório"),
    descricaoDestino: Yup.string().required("Campo obrigatório"),
    dataChegada: Yup.date().required("Campo obrigatório"),
    duracaoViagem: Yup.number().required("Campo obrigatório").positive("Duração deve ser maior que zero"),
    orçamento: Yup.number().required("Campo obrigatório").positive("Orçamento deve ser maior que zero"),
    atividadePrincipal: Yup.string().required("Campo obrigatório"),
    urlImagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
    clienteSelecionado: Yup.string().required("Campo obrigatório")
  })

  function salvarDestino(dados) {
    // Busca o objeto completo do cliente a partir do clienteSelecionado (ID)
    const cliente = clientes.find(c => c.id === parseInt(dados.clienteSelecionado))

    // Cria um novo destino com um ID único e o objeto do cliente completo
    const novoDestino = {
      id: new Date().getTime(),  // Gera um ID único com base no timestamp
      ...dados,
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
        <div className='text-end mb-2'>
          {/* Botão para adicionar um novo cliente */}
          <Button href='/destino/form'><FaPlayCircle /> Novo Destino</Button>
        </div>
        <Card className="p-4 shadow-lg rounded">
          <Card.Body>
            <h3 className="text-center mb-4">Cadastro de Destinos</h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={salvarDestino}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Nome do Destino:</Form.Label>
                      <Form.Control
                        type="text"
                        name="nomeDestino"
                        value={values.nomeDestino}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.nomeDestino && !errors.nomeDestino}
                        isInvalid={touched.nomeDestino && errors.nomeDestino}
                      />
                      <Form.Control.Feedback type="invalid">{errors.nomeDestino}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Descrição do Destino:</Form.Label>
                      <Form.Control
                        type="text"
                        name="descricaoDestino"
                        value={values.descricaoDestino}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.descricaoDestino && !errors.descricaoDestino}
                        isInvalid={touched.descricaoDestino && errors.descricaoDestino}
                      />
                      <Form.Control.Feedback type="invalid">{errors.descricaoDestino}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Data de Chegada:</Form.Label>
                      <Form.Control
                        type="date"
                        name="dataChegada"
                        value={values.dataChegada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataChegada && !errors.dataChegada}
                        isInvalid={touched.dataChegada && errors.dataChegada}
                      />
                      <Form.Control.Feedback type="invalid">{errors.dataChegada}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Duração da Viagem:</Form.Label>
                      <Form.Control
                        type="number"
                        name="duracaoViagem"
                        value={values.duracaoViagem}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.duracaoViagem && !errors.duracaoViagem}
                        isInvalid={touched.duracaoViagem && errors.duracaoViagem}
                      />
                      <Form.Control.Feedback type="invalid">{errors.duracaoViagem}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Orçamento Estimado:</Form.Label>
                      <Form.Control
                        type="number"
                        name="orçamento"
                        value={values.orçamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.orçamento && !errors.orçamento}
                        isInvalid={touched.orçamento && errors.orçamento}
                      />
                      <Form.Control.Feedback type="invalid">{errors.orçamento}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Atividade Principal:</Form.Label>
                      <Form.Control
                        type="text"
                        name="atividadePrincipal"
                        value={values.atividadePrincipal}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.atividadePrincipal && !errors.atividadePrincipal}
                        isInvalid={touched.atividadePrincipal && errors.atividadePrincipal}
                      />
                      <Form.Control.Feedback type="invalid">{errors.atividadePrincipal}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>URL da Imagem:</Form.Label>
                      <Form.Control
                        type="text"
                        name="urlImagem"
                        value={values.urlImagem}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.urlImagem && !errors.urlImagem}
                        isInvalid={touched.urlImagem && errors.urlImagem}
                      />
                      <Form.Control.Feedback type="invalid">{errors.urlImagem}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Cliente Selecionado:</Form.Label>
                      <Form.Select
                        name="clienteSelecionado"
                        value={values.clienteSelecionado}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.clienteSelecionado && !errors.clienteSelecionado}
                        isInvalid={touched.clienteSelecionado && errors.clienteSelecionado}
                      >
                        <option value="">Selecione um Cliente</option>
                        {clientes.map(cliente => (
                          <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.clienteSelecionado}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="text-center">
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
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </Pagina>
  )
}
