import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Register from './pages/Register'
import Secret from './pages/Secret'
import Login from './pages/Login'

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Secret />} />
      </Routes>
    </BrowserRouter>
  )
}
