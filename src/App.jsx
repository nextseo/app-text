import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout';
import CheckRouter from './routers/CheckRouter';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';

const App = () => {

  const token = localStorage.getItem('Token_app_text')
  return (
<div>
{token ?  (
<CheckRouter />
) :(
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='*' element={<Login/>} />
  </Routes>
  
)}
</div>
  )
}

export default App