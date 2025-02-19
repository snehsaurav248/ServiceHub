import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// ✅ Get all orders (Admin)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error.response?.data || error.message);
    return { error: "Failed to fetch orders", data: [] };
  }
};

// ✅ Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating order status:", error.response?.data || error.message);
    return { error: "Failed to update order status" };
  }
};
