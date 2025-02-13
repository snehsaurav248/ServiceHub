import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold text-white">ServiceHub</h2>
          <p className="text-sm mt-2">Your trusted service marketplace.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/services" className="hover:text-gray-400">Services</Link></li>
            <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold text-white">Subscribe to our Newsletter</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 p-2 w-full rounded bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Subscribe
          </button>
        </div>

      </div>

      {/* Social Media Links */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <Facebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <Twitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            <Instagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Linkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
