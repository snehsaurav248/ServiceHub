import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServiceList from "./pages/ServiceList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider> {/* Authentication Provider for Login, Role-based Access */}
      <UserProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow px-4 sm:px-8 lg:px-16 py-6">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<ServiceList />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />

                  {/* Protected Admin Routes */}
                  <Route path="/admin/*" element={<AdminRoute />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
