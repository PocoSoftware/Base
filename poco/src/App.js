import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Kalendarz from "./Components/Kalendarz";
import Oszczednosci from "./Components/Oszczednosci";
import Inwestowanie from "./Components/Inwestowanie";
import Customer from './Components/Customer';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/customer' element={<Customer />} />
          <Route path="/Kalendarz" element={<Kalendarz />} />
          <Route path="/Oszczednosci" element={<Oszczednosci />} />
          <Route path="/Inwestowanie" element={<Inwestowanie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
