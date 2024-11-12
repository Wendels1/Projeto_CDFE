'use client'

import Pagina from './components/Pagina';
import { Container, Button, Row, Col, Carousel } from 'react-bootstrap';
import { FaPlane, FaHotel, FaGlobeAmericas } from 'react-icons/fa';


export default function Home() {
  return (
    <Pagina titulo="Bem-vindo à FlexiJourney a agência de viagens nacionais">
        
        {/* Banner com Carrossel */}
        <div className="text-center my-5">
          <Carousel>
            <Carousel.Item>
              <img 
                src="images/original.jpg" 
                alt="Imagem de Viagem 1" 
                className="d-block w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }} 
              />
            </Carousel.Item>
            <Carousel.Item>
              <img 
                src="https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2020/12/15134544/Estaiada-Bridge-Sao-Paulo-Brazil-South-America.jpg" 
                alt="Imagem de Viagem 2" 
                className="d-block w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }} 
              />
            </Carousel.Item>
            <Carousel.Item>
              <img 
                src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/34/08/58.jpg" 
                alt="Imagem de Viagem 3" 
                className="d-block w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }} 
              />
            </Carousel.Item>
          </Carousel>
          <h2 className="mt-4 text-uppercase" style={{ fontWeight: '700', color: 'white' }}>
            Bem-vindo à Nossa Agência de Viagens Nacionais
          </h2>
          <h3 className="mt-2 text-uppercase" style={{ fontWeight: '700', color: 'white' }}>
            Explore os Melhores Destinos Nacionais do Brasil!
          </h3>
          <Button 
            variant="primary" 
            size="lg" 
            className="mt-3"
            style={{
              transition: 'all 0.3s ease',
              borderRadius: '50px',
              padding: '12px 30px',
              fontWeight: 'bold'
            }} 
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Explore Nossos Pacotes Nacionais
          </Button>
        </div>

        {/* Sobre a Agência */}
        <Container className="my-5 text-center">
          <h3 className="mb-4" style={{ fontWeight: '600', color: 'white' }}>Sobre a Agência</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            Somos uma agência de viagens especializada em oferecer pacotes personalizados para os destinos mais incríveis do Brasil. Conheça as belezas e riquezas de nossa terra!
          </p>
        </Container>

        {/* Serviços */}
        <Container className="my-5 text-center">
          <h3 className="mb-4" style={{ fontWeight: '600', color: 'white' }}>O Que Oferecemos</h3>
          <Row>
            <Col md={4} className="mb-4">
              <div className="service-card p-4 border rounded-3 shadow-sm bg-dark text-light">
                <FaPlane size={50} color="white" />
                <h4 className="mt-3" style={{ fontWeight: '500' }}>Pacotes de Viagem Nacional</h4>
                <p>Oferecemos pacotes exclusivos para os melhores destinos nacionais do Brasil.</p>
                <Button variant="link" style={{ color: 'white' }}>Saiba mais</Button>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-card p-4 border rounded-3 shadow-sm bg-dark text-light">
                <FaHotel size={50} color="white" />
                <h4 className="mt-3" style={{ fontWeight: '500' }}>Hospedagem</h4>
                <p>Oferecemos as melhores opções de hospedagem, com conforto e economia.</p>
                <Button variant="link" style={{ color: 'white' }}>Saiba mais</Button>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-card p-4 border rounded-3 shadow-sm bg-dark text-light">
                <FaGlobeAmericas size={50} color="white" />
                <h4 className="mt-3" style={{ fontWeight: '500' }}>Guias de Destino</h4>
                <p>Encontre tudo sobre seu destino para aproveitar ao máximo sua viagem.</p>
                <Button variant="link" style={{ color: 'white' }}>Saiba mais</Button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Depoimentos */}
        <Container className="my-5 text-center">
          <h3 className="mb-4" style={{ fontWeight: '600', color: 'white' }}>O que nossos clientes dizem</h3>
          <Row>
            <Col md={4} className="mb-4">
              <p>"A viagem foi maravilhosa, a agência cuidou de tudo para nós!" - João Silva</p>
            </Col>
            <Col md={4} className="mb-4">
              <p>"Atendimento excelente e pacotes de viagens incríveis!" - Maria Souza</p>
            </Col>
            <Col md={4} className="mb-4">
              <p>"Recomendo a todos! Experiência incrível do começo ao fim." - Carlos Oliveira</p>
            </Col>
          </Row>
        </Container>

        {/* Rodapé */}
        <footer className="text-center py-4 bg-dark text-light">
          <p>© 2024 FlexiJourney | Todos os direitos reservados.</p>
        </footer>
      
    </Pagina>
  );
}
