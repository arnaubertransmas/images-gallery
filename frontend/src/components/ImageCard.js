import React from 'react';
import { Card, Button } from 'react-bootstrap';

const imageCard = ({ image, deleteImage, saveImage }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls?.small} />
      <Card.Body>
        {/* si img title existeix la converteix en UpperCase */}
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        {!image.saved && (
          <Button variant="primary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}{' '}
        <Button variant="secondary" onClick={() => deleteImage(image.id)}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default imageCard;
