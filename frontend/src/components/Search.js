import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Search = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {/* // https://react-bootstrap.netlify.app/docs/layout/grid#col */}
        {/* num de columnes per medium, large and small devices | gridbox */}
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              {/* agafa 9/12 de l amplada de l input. Les altres 3 les pilla del submit */}
              <Col xs={9}>
                <Form.Control
                  type="text"
                  // controlem l'input connectant el valor amb l'estat
                  value={word}
                  // quan el input canviï actualitzem el valor de l'estat
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Busca una imatge"
                />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Buscar
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
