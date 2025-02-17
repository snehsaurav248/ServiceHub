import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Make sure this import is correct
import axios from "axios";

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext); // Destructure user, setUser, and logout
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better UX
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data) {
          setUser(response.data); // Update context with user data
        } else {
          setError("Unable to fetch profile data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching the profile. Please try again.");
        logout(); // Clear session if error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setUser, logout]); // Ensure that setUser is available

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>; // Display error message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl w-full">
        
        {/* Back Button */}
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.name || "User Name"}</h2>
            <p className="text-gray-500">{user?.email || "user@example.com"}</p>
            <span className={`text-sm font-semibold px-3 py-1 rounded-md ${user?.role === "admin" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
              {user?.role === "admin" ? "Admin Mode" : "User Mode"}
            </span>
          </div>
        </div>

        {/* Display Credentials */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <p className="text-gray-800">{user?.name || "N/A"}</p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <p className="text-gray-800">{user?.email || "N/A"}</p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Phone</label>
            <p className="text-gray-800">{user?.phone || "N/A"}</p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Address</label>
            <p className="text-gray-800">{user?.address || "N/A"}</p>
          </div>
        </div>

        {/* Order History (User Mode) */}
        {user?.role === "user" && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Order History</h3>
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-gray-700">No orders yet.</p>
            </div>
          </div>
        )}

        {/* Admin Panel (Admin Mode) */}
        {user?.role === "admin" && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Admin Dashboard</h3>
            <p className="text-gray-700">Manage users, orders, and settings.</p>
            <Link
              to="/admin/dashboard"
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Go to Admin Panel
            </Link>
          </div>
        )}

        {/* Settings & Logout */}
        <div className="mt-8 flex justify-between">
          <Link
            to="/settings"
            className="flex items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-800"
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
