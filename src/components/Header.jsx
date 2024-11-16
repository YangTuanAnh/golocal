import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>GoLocal</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/services">Services</Link> | <Link to="/bookings">Bookings</Link>
      </nav>
    </header>
  );
};

export default Header;
