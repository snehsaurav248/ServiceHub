import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white tracking-wide">
          Service<span className="text-yellow-300">Hub</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow mx-8 items-center bg-white rounded-full px-4 py-2 w-full shadow-md">
          <Search size={20} className="text-blue-600" />
          <input
            type="text"
            placeholder="Search for services..."
            className="bg-transparent outline-none px-3 text-sm w-full text-gray-700"
          />
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 text-lg transition">Home</Link>
          <Link to="/services" className="text-white hover:text-yellow-300 text-lg transition">Services</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-white hover:text-yellow-300 transition" />
          </Link>
          <Link to="/profile">
            <User size={24} className="text-white hover:text-yellow-300 transition" />
          </Link>
          <Link to="/login" className="px-5 py-2 bg-yellow-300 text-blue-800 font-semibold rounded-full text-lg hover:bg-yellow-400 transition">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="bg-white text-gray-800 shadow-md flex flex-col items-center md:hidden py-4 absolute w-full space-y-4">
          <li><Link to="/" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/services" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/cart" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Cart</Link></li>
          <li><Link to="/profile" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Profile</Link></li>
          <li>
            <Link to="/login" className="px-5 py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition">
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
