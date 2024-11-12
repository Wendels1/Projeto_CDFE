'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Container, Card } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import Pagina from '@/app/components/Pagina'
import ReactInputMask from 'react-input-mask'



export default function ClienteFormPage() {

  const searchParams = useSearchParams() // Obtendo parâmetros da URL
  const id = searchParams.get('id') // Pegando o ID do cliente para edição


  const router = useRouter() // Hook para navegação

  const [estados, setEstados] = useState([])  // Estado para armazenar lista de estados
  const [cidades, setCidades] = useState([]) // Estado para armazenar lista de cidades


  // Simulando dados de clientes do localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const clienteEditado = clientes.find(item => item.id == id) // Se o ID estiver presente, recupera os dados do cliente para edição

   // Cidades para cada estado (exemplo)
  const estadosBrasil = [
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'GO', nome: 'Goiás' }
  ]

  // Cidades para cada estado (exemplo)
  const cidadesPorEstado = {
    SP: ['São Paulo', 'Campinas', 'Sorocaba'],
    RJ: ['Rio de Janeiro', 'Niterói', 'Campos'],
    MG: ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora'],
    BA: ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
    RS: ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
    PR: ['Curitiba', 'Londrina', 'Maringá'],
    PE: ['Recife', 'Olinda', 'Jaboatão'],
    CE: ['Fortaleza', 'Sobral', 'Juazeiro do Norte'],
    SC: ['Florianópolis', 'Joinville', 'Blumenau'],
    GO: ['Goiânia', 'Anápolis', 'Rio Verde']
  }

  useEffect(() => {
    // Inicializando a lista de estados assim que o componente é montado
    setEstados(estadosBrasil)
  }, [])

  // Função para atualizar as cidades conforme o estado selecionado
  const handleEstadoChange = (estadoSigla) => {
    setCidades(cidadesPorEstado[estadoSigla] || [])
  }

   // Função para salvar os dados do cliente no localStorage
  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados) // Atualiza os dados do cliente se ele já existir
      localStorage.setItem('clientes', JSON.stringify(clientes))
    } else {
      dados.id = v4() // Gera um ID único para o novo cliente
      clientes.push(dados) // Adiciona o novo cliente à lista
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }

    alert("Cliente salvo com sucesso!") // Mensagem de sucesso
    router.push("/clientes") // Navega de volta para a lista de clientes
  }

    // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    estado: '',
    cidade: '',
    endereco: '',
    telefone: '',
    email: '',
    cpf: '',
    dataNascimento: ''
  }

  // Validação dos campos utilizando a biblioteca Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório")
  })

  return (
    <Pagina>
      <Container className="my-4">
        {/* Card que contém o formulário */}
        <Card className="p-4 shadow-lg rounded">
          <Card.Body>
            <Formik
              initialValues={clienteEditado || initialValues}
              validationSchema={validationSchema}
              onSubmit={salvar}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <h3 className="text-center mb-4">Formulário de cadastro de cliente</h3>

                  {/* Nome */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Nome:</Form.Label>
                      <Form.Control
                        name="nome"
                        type="text"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.nome && !errors.nome}
                        isInvalid={touched.nome && errors.nome}
                      />
                      <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Estado */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Estado:</Form.Label>
                      <Form.Select
                        name="estado"
                        value={values.estado}
                        onChange={(e) => {
                          handleChange(e)
                          handleEstadoChange(e.target.value) // Atualiza as cidades com base no estado selecionado
                        }}
                        onBlur={handleBlur}
                        isValid={touched.estado && !errors.estado}
                        isInvalid={touched.estado && errors.estado}
                      >
                        <option value="">Selecione</option>
                        {estados.map((estado) => (
                          <option key={estado.sigla} value={estado.sigla}>
                            {estado.nome}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.estado}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Cidade */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Cidade:</Form.Label>
                      <Form.Select
                        name="cidade"
                        value={values.cidade}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.cidade && !errors.cidade}
                        isInvalid={touched.cidade && errors.cidade}
                      >
                        <option value="">Selecione</option>
                        {cidades.map((cidade, index) => (
                          <option key={index} value={cidade}>
                            {cidade}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.cidade}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Endereço */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Endereço:</Form.Label>
                      <Form.Control
                        name="endereco"
                        type="text"
                        value={values.endereco}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.endereco && !errors.endereco}
                        isInvalid={touched.endereco && errors.endereco}
                      />
                      <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Telefone */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Telefone:</Form.Label>
                      <Form.Control
                        name="telefone"
                        type="text"
                        value={values.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.telefone && !errors.telefone}
                        isInvalid={touched.telefone && errors.telefone}
                      />
                      <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Email */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* CPF */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>CPF:</Form.Label>
                      <Form.Control 
                        //as={ReactInputMask}
                        mask={"999.999-99"}
                        placeholder='999.999-99'
                        name="cpf"
                        type="text"
                        value={values.cpf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.cpf && !errors.cpf}
                        isInvalid={touched.cpf && errors.cpf}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Data de Nascimento */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Data de Nascimento:</Form.Label>
                      <Form.Control
                        name="dataNascimento"
                        type="date"
                        value={values.dataNascimento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataNascimento && !errors.dataNascimento}
                        isInvalid={touched.dataNascimento && errors.dataNascimento}
                      />
                      <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Botões */}
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => router.push('/clientes')}><FaArrowLeft /> Voltar</Button>
                    <Button variant="primary" type="submit"><FaCheck /> Salvar</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </Pagina>
  )
}
