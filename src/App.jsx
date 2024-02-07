import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='bg-gray-200 h-screen w-full'>
      <Header/>
      <ToastContainer autoClose={1500} theme="colored" />
      <div className='container mt-5 px-10'>
        <Home/>
      </div>
    </div>
  )
}

export default App