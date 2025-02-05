import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>ServiceHub</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;