import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsFrontend from './pages/ProductsFrontend';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsFrontend />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
