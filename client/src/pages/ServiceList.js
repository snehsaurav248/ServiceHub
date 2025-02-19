import React, { useState, useEffect, useContext } from "react";
import { ArrowRightCircle, Search, XCircle, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

const ServiceList = () => {
  const { addToCart } = useContext(CartContext);
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch services from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/services") // Update with your backend URL
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Filter services based on search input
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal for booking
  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    const formData = {
      service: selectedService.name,
      name: e.target.name.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
    };

    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Booking confirmed!");
        closeModal();
      })
      .catch((error) => console.error("Error booking service:", error));
  };

  // Add to cart functionality
  const handleAddToCart = (service) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    })
      .then((response) => response.json())
      .then(() => alert(`${service.name} added to cart!`))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Available Services
        </h2>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for a service..."
            className="bg-transparent outline-none px-3 text-lg w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Service List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {service.name}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBookNow(service)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                  >
                    Book Now
                    <ArrowRightCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleAddToCart(service)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
                  >
                    Add to Cart
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-2">
              No services found.
            </p>
          )}
        </ul>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedService.name}</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <XCircle size={24} />
              </button>
            </div>
            <p className="text-gray-700 mb-4">Charges: {selectedService.price}</p>

            {/* Booking Form */}
            <form onSubmit={handleBooking}>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium">Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Address</label>
                <textarea
                  name="address"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                  rows="3"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
