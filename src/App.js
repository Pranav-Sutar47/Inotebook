import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { useState } from 'react';
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {

  const [toggle,setToggle] = useState('light');

  const changeColor =()=>{
    if(toggle==='light')
      setToggle('dark');
    else 
      setToggle('light');
  }

  return (
    <div className="App">
      <NoteState>
      <BrowserRouter>
        <Navbar toggleMode={changeColor} toggle={toggle}/>
        <Routes>
          <Route path='/' element={<Home toggleMode={changeColor} toggle={toggle}/>} />
          <Route path='/about' element = {<About toggleMode={changeColor} toggle={toggle} />}/>
          <Route path='/login' element={ <Login toggleMode={changeColor} toggle={toggle}/> }/>
          <Route path='/signup' element={ <SignUp toggleMode={changeColor} toggle={toggle}/> }/>
        </Routes>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
