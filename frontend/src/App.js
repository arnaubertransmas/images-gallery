import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  // usestate retorna 2 variables, str(word) i function(setWord)
  // '' variable inicial del state
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // amb word controlem cada caràcter q l'user introdueix a l'input
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`,
    )
      .then((result) => result.json())
      .then((data) => {
        // afegim la nova img al principi i fem un retrive de les images antigues
        setImages([{ ...data, title: word }, ...images]); // no fem push pq així evitem mutar la llista
      })
      .catch((error) => {
        console.log(error);
      });
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {/* si hi ha imatges es mostra un Component sinó un altre */}
        {images.length ? (
          <Row xs={1} md={3} ld={3}>
            {/* loop x l'array d'images i les va mostrant | key per afegir identificador únic*/}
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
