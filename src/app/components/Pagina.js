'use client'

import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { FaHome, FaGlobe, FaCog } from 'react-icons/fa';

export default function Pagina({ titulo, children }) {
  return (
    <div style={{ backgroundColor: '#121212', color: '#f1f1f1', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <FaGlobe className="mr-2" /> <span>FlexiJourney</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="text-light">
                <FaHome className="mr-2" /> Home
              </Nav.Link>

              <NavDropdown title="Clientes" id="clientes-nav-dropdown">
                <NavDropdown.Item href="/clientes/form">Cadastro</NavDropdown.Item>
                <NavDropdown.Item href="/clientes">Lista de Clientes</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Destinos" id="viagens-nav-dropdown">
                <NavDropdown.Item href="/destinos/form">Cadastro</NavDropdown.Item>
                <NavDropdown.Item href="/destinos">Lista de Viagens</NavDropdown.Item>
              </NavDropdown>

              
              <NavDropdown title="Reservas" id="viagens-nav-dropdown">
                <NavDropdown.Item href="/reservas/form">Cadastro</NavDropdown.Item>
                <NavDropdown.Item href="/reservas">Lista de Destinos</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/fornecedores" className="text-light">
                <FaCog className="mr-2" /> Fornecedores
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de Título */}
      <Container className="mt-5">
        <h1 className="text-light">{titulo}</h1>
      </Container>

      {/* Conteúdo da Página */}
      <Container className="mt-4">
        {children}
      </Container>
    </div>
  );
}
