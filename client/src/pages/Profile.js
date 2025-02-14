import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Save, ArrowLeft, Settings, ShoppingCart } from "lucide-react";

const Profile = () => {
  // Mock user data (Replace this with actual user data from API or context)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main Street, New York, USA",
    profilePic: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle save
  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

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
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <button
            className="ml-auto bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit size={18} />
            <span>Edit</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{user.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{user.address}</p>
            )}
          </div>

          {isEditing && (
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
              onClick={handleSave}
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          )}
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
