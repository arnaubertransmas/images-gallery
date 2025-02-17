import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Jumbotron>
      <h1>Images Gallery</h1>
      <p>
        Això és una simple aplicació. Per començar entra qualsevol text per
        obtenir una imatge.
      </p>
      <p>
        <Button bsStyle="primary" href="https://unsplash.com" target="_blank">
          Saber-ne més
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Welcome;
