import './App.css';
import imageHandler from './imageClickingHandler';
import {useState} from 'react';

function App() {
  const [mark, setMark] = useState({})

  function markWaldo(e:MouseEvent, callback):void {
    console.log('from callback: ', callback(e))
  }


  return (
    <>
      <h1>Welcome in where's waldo game</h1>
      <div style={{ position: 'relative' }}>
        <img
          onClick={(e)=>{markWaldo(e, imageHandler)}}
          src='https://cdn.pixabay.com/photo/2015/02/07/13/36/computer-627220_1280.jpg'
          alt=''
        />
      </div>
    </>
  );
}

export default App
