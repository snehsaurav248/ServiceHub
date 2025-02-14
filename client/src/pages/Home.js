import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to ServiceHub</h1>
        <p className="text-lg mb-6">Your go-to platform for finding and offering services.</p>
        <button 
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </section>

      {/* Service Categories */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Explore Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Home Repairs</h3>
            <p>Find skilled professionals for plumbing, electrical, and more.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Freelance Work</h3>
            <p>Hire experts in design, writing, development, and marketing.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Tutoring & Education</h3>
            <p>Connect with top tutors in various subjects.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-200 py-12 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 text-center">
          <div className="p-6 bg-white shadow-md rounded-lg w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Step 1: Sign Up</h3>
            <p>Create a free account and set up your profile.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Step 2: Browse Services</h3>
            <p>Find the best services tailored to your needs.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Step 3: Hire & Connect</h3>
            <p>Get in touch with service providers instantly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="italic">"ServiceHub made it easy to find a reliable plumber. Highly recommended!"</p>
            <p className="mt-2 font-bold">- Sarah M.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="italic">"As a freelancer, I found so many clients here. Great platform!"</p>
            <p className="mt-2 font-bold">- John D.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="italic">"Fantastic experience hiring a tutor for my son!"</p>
            <p className="mt-2 font-bold">- Emily R.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Join ServiceHub Today</h2>
        <p className="text-lg mb-6">Start hiring or offering services effortlessly.</p>
        <button 
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;
