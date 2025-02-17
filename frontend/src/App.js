import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
// si no hi ha cap ruta definida s'utilitzarà la del Backend(Flask)
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  // usestate retorna 2 variables, str(word) i function(setWord)
  // '' variable inicial del state
  // amb word controlem cada caràcter q l'user introdueix a l'input
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // callback funcion + dependencies, array buit pq només es cridi un cop
  useEffect(() => {
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // ruta reflectint a Flask
    try {
      // retorna un json directament, seguidament afegim l img a l state
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]); // no fem push pq així evitem mutar la llista
    } catch (error) {
      console.log(error);
    }
    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    // afegim nova key a l'obj
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved); // 2nd arg és data q s'envia automaticament, convertit a json
      if (res.data?.inserted_id) {
        // modifiquem l'estat de l'img i afegim la clau saved si és necessàri
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
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
                <ImageCard
                  image={image}
                  deleteImage={handleDeleteImage}
                  saveImage={handleSaveImage}
                />
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
