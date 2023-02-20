import React, { useState } from 'react'
import "./index.css"
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';

export default function App() {
  const [alert , setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }

  return (
    <NoteState>
    <div>
      <Navbar/>
     <Alert alert={alert} />
     
      <div className='container'>
      <Routes>
   <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
   <Route path="/about" element={<About/>}/>
   <Route path="/login" element={<Login showAlert={showAlert} />}/>
   <Route path="/signup" element={<SignUp showAlert={showAlert} />}/>


      </Routes>
      </div>
    </div>
    
    </NoteState>
  )
}



