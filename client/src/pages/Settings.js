import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { UserContext } from "../context/UserContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const [profilePic, setProfilePic] = useState(user.profilePic || "https://via.placeholder.com/100");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      setUser((prevUser) => ({ ...prevUser, profilePic: imageUrl })); // ✅ Corrected
    }
  };
  
  const handleDone = () => {
    navigate("/profile");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg p-6 mt-8 space-y-6">
      <h2 className="text-3xl font-bold text-center">Settings</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 dark:border-gray-600"
          />
          <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
            <FaCamera />
            <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
          </label>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Theme</span>
        <div className="flex gap-4">
          {["light", "dark", "system"].map((t) => (
            <button
              key={t}
              className={`p-2 rounded-lg ${theme === t ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTheme(t)}
            >
              {t === "light" ? <FaSun /> : t === "dark" ? <FaMoon /> : <FaDesktop />}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      {[{
        label: "Enable Notifications",
        state: notifications,
        setState: setNotifications
      }, {
        label: "Email Notifications",
        state: emailNotifications,
        setState: setEmailNotifications
      }, {
        label: "Push Notifications",
        state: pushNotifications,
        setState: setPushNotifications
      }, {
        label: "Two-Factor Authentication",
        state: twoFactorAuth,
        setState: setTwoFactorAuth
      }].map(({ label, state, setState }) => (
        <div key={label} className="flex justify-between items-center">
          <span>{label}</span>
          <Switch
            checked={state}
            onChange={setState}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${state ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <span className="sr-only">{label}</span>
            <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${state ? "translate-x-6" : "translate-x-1"}`} />
          </Switch>
        </div>
      ))}

      {/* Change Password */}
      <button onClick={() => setShowPasswordModal(true)} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Change Password
      </button>

      {/* Delete Account */}
      <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
        Delete Account
      </button>

      {/* Done Button */}
      <button onClick={handleDone} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
        Done
      </button>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <input type="password" placeholder="New Password" className="w-full p-2 border rounded mb-3 dark:bg-gray-700 dark:text-white" />
            <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
