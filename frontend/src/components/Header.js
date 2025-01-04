import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = (props) => {
  return (
    <Navbar style={{ backgroundColor: '#cccccc' }} data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'black' }}>
          {props.title}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
