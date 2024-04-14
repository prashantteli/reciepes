import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top" >
      <Container>
        <Navbar.Brand href="#home">Reciepes Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Row>
          <Col>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Col>
        </Row>


      </Container>
    </Navbar>
  );
}

export default Header;