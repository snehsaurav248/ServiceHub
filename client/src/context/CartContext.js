import React, { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Ensure each item has a unique ID when added
  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, { ...service, uniqueId: Date.now() + Math.random() }]);
  };

  // ✅ Remove only the clicked item (matching uniqueId)
  const removeFromCart = (uniqueId) => {
    const index = cart.findIndex((item) => item.uniqueId === uniqueId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1); // Remove only the first occurrence
      setCart(newCart);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
