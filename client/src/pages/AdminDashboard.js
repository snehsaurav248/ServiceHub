import React, { useEffect, useState } from "react";
import axios from "axios";
import AddServiceForm from "../components/AddServiceForm"; // Import the AddServiceForm

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        console.log("API Response:", response.data);
        setOrders(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
        setOrders([]); // Ensure orders is always an array
      });
  }, []);

  const handleApprove = (id) => {
    axios
      .put(`http://localhost:5000/orders/${id}`, { status: "approved" })
      .then(() =>
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, status: "approved" } : order
          )
        )
      )
      .catch((error) => console.error("Error updating order", error));
  };

  const handleReject = (id) => {
    axios
      .put(`http://localhost:5000/orders/${id}`, { status: "rejected" })
      .then(() =>
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, status: "rejected" } : order
          )
        )
      )
      .catch((error) => console.error("Error updating order", error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Add Service Form */}
      <div className="mb-6">
        <AddServiceForm />
      </div>

      {/* Orders Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Order ID</th>
                <th className="border p-3">User</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border p-3">{order._id}</td>
                  <td className="border p-3">{order.userEmail}</td>
                  <td className="border p-3">{order.status}</td>
                  <td className="border p-3">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(order._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded mx-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(order._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded mx-1"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
