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
  const router = useRouter()
  const searchParams = useSearchParams() // Obtendo parâmetros da URL
  const id = searchParams.get('id') // Pegando o ID do cliente para edição

  const [clientes, setClientes] = useState([]) // Estado para armazenar lista de clientes
  const [estados, setEstados] = useState([])  // Estado para armazenar lista de estados
  const [cidades, setCidades] = useState([]) // Estado para armazenar lista de cidades
  
  // Simulando dados de clientes do localStorage
  useEffect(() => {
    const clientesSalvos = JSON.parse(localStorage.getItem('clientes')) || []
    setClientes(clientesSalvos)
    setEstados([
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
    ])
  }, [])

  const clienteEditado = clientes.find(item => item.id == id) // Se o ID estiver presente, recupera os dados do cliente para edição
  
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

  const handleEstadoChange = (estadoSigla) => {
    setCidades(cidadesPorEstado[estadoSigla] || [])
  }

  function salvar(dados) {
    if (clienteEditado) {
      const clientesAtualizados = clientes.map(item => item.id === clienteEditado.id ? { ...item, ...dados } : item)
      localStorage.setItem('clientes', JSON.stringify(clientesAtualizados))
    } else {
      dados.id = v4() // Gera um ID único para o novo cliente
      const novosClientes = [...clientes, dados]
      localStorage.setItem('clientes', JSON.stringify(novosClientes))
    }

    alert("Cliente salvo com sucesso!")
    router.push("/clientes")
  }

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
    <Pagina titulo="Cadastro de Clientes">
      <Container className="my-4">
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

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Estado:</Form.Label>
                      <Form.Select
                        name="estado"
                        value={values.estado}
                        onChange={(e) => {
                          handleChange(e)
                          handleEstadoChange(e.target.value)
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

                  <Row className="mb-3">
                    <Form.Group as={Col} md={6}>
                      <Form.Label>CPF:</Form.Label>
                      <Form.Control //as={ReactInputMask}
                        mask={"999.999-99"}
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

                  <Row className="text-center">
                    <Button type="submit" className="btn btn-success mr-2">
                      <FaCheck /> Salvar
                    </Button>
                    <Button onClick={() => router.push('/clientes')} className="btn btn-secondary">
                      <FaArrowLeft /> Voltar
                    </Button>
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
