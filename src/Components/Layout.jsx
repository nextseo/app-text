import React from 'react'
import Header from './Header'
import { ToastContainer } from 'react-toastify'
import Home from './Home'

const Layout = () => {
  return (
    <div className='bg-gray-200 h-full md:h-screen w-full'>
    <Header/>
    <ToastContainer autoClose={1500} theme="colored" />
    <div className='container mt-5 px-5 md:px-10'>
      <Home/>
    </div>
  </div>
  )
}

export default Layout