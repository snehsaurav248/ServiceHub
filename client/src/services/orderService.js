import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`${API_URL}/${orderId}`, { status });
  } catch (error) {
    console.error("Error updating order status", error);
  }
};
