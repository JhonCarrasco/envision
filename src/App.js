
import { useState } from 'react';
import './App.css';
import { ModalScreen } from './components/movie/ModalScreen';
import { fetchNoToken } from './helpers/fetch';

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);

    
  const handleGetMovies = async () => {
    
    const resp = await fetchNoToken(process.env.REACT_APP_API_GET_URL,{});
    const { response } = await resp.json();
    let arr = [...response];
    arr.sort((a, b) => {return a.rating - b.rating});
    
    
    if(arr.length > 0){
      setData(arr)
      setIsOpen(true)
    }
    else {
      setData(null)
      setIsOpen(false)
    }
  }

  
  
  return (
    <div className="App">
      <input type="button" className="btn btn-secondary" onClick={ handleGetMovies } value="Get Movies" />

      <ModalScreen data={ data } setData={setData} isOpen={isOpen} setIsOpen={ setIsOpen}/>
    </div>
  );
}

export default App;


