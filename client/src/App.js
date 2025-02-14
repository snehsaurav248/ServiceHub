import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServiceList from "./pages/ServiceList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; 
import Settings from "./pages/Settings"; 

function App() {
  return (
    <UserProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 lg:px-16 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/settings" element={<Settings />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
