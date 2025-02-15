import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { XCircle } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-purple-500 to-indigo-600 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.uniqueId}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105"
              >
                <span className="text-lg font-semibold text-gray-800">{item.name}</span>
                <button
                  onClick={() => removeFromCart(item.uniqueId)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove <XCircle size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
