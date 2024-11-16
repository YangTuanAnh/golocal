import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Services from './components/Services';
import Bookings from './components/Bookings';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
