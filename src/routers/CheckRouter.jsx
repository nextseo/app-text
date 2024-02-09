import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../Components/Layout'

const CheckRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/admin' element={<Layout/>}>
                <Route index element={<Layout/>}/>
            </Route>
            <Route path='/' element={<Navigate to='/admin' />}/>
            <Route path='*' element={<Navigate to='/admin' />}/>
        </Routes>
    </div>
  )
}

export default CheckRouter