import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsFrontend from './pages/ProductsFrontend';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsFrontend />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
