import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

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
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Phone</label>
            <p className="text-gray-800">{user?.phone || "N/A"}</p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Address</label>
            <p className="text-gray-800">{user?.address || "N/A"}</p>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Order History</h3>
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700">No orders yet.</p>
          </div>
        </div>

        {/* Settings & Logout */}
        <div className="mt-8 flex justify-between">
          <Link
            to="/settings"
            className="flex items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-800"
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Link>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
