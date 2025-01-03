import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

const App = () => {
  // usestate retorna 2 variables, str(word) i function(setWord)
  // '' variable inicial del state
  const [word, setWord] = useState('')
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // amb word controlem cada caràcter q l'user introdueix a l'input
    console.log(word)

    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }  
  // console.log(word)



  return (
    <div>
      <Header title="Images Gallery"/>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
    </div>
    
  );
}

export default App;