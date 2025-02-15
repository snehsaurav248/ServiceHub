import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import CartProvider from "./context/CartContext";  // Import Cart Context
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServiceList from "./pages/ServiceList";
import Cart from "./pages/Cart";  // Import Cart Page
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; 
import Settings from "./pages/Settings"; 
import Contact from "./pages/Contact";  
import About from "./pages/About";  

function App() {
  return (
    <UserProvider>
      <CartProvider>  {/* Wrap CartProvider */}
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow px-4 sm:px-8 lg:px-16 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServiceList />} />
                <Route path="/cart" element={<Cart />} />  {/* Cart Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/settings" element={<Settings />} /> 
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
