import './App.css';
import imageHandler from './imageClickingHandler';

function App() {


  return (
    <>
      <h1>Welcome in where's waldo game</h1>
      <img
        onClick={imageHandler}
        src='https://cdn.pixabay.com/photo/2015/02/07/13/36/computer-627220_1280.jpg'
        alt=''
      />
    </>
  );
}

export default App
