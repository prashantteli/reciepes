import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../App.scss';

export default function SearchBar() {
  return (<div className="searchSection">
    <Container>
      <Row>
        <Col md="4">
          <h5>Search your favorite recipes here</h5>
        </Col>
        <Col md="8">
          <Form.Control aria-label="Text input with dropdown button" placeholder="Search your favorite reciepe" />
        </Col>
      </Row>
    </Container>
  </div>)
}