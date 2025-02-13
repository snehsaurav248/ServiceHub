import React, { useState } from "react";
import { ArrowRightCircle, Search } from "lucide-react";

const services = [
  "Plumbing",
  "Electrician",
  "Grocery Delivery",
  "Carpentry",
  "House Cleaning",
  "Pest Control",
  "Laundry",
  "Home Painting",
  "Appliance Repair",
  "Fitness Trainer",
];

const ServiceList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services based on search input
  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  {service}
                </span>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                  Book Now
                  <ArrowRightCircle size={20} />
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-2">
              No services found.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ServiceList;
