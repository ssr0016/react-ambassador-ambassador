import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsFrontend from './pages/ProductsFrontend';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsFrontend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
