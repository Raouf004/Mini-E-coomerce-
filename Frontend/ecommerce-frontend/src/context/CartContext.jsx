import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id_product === product.id_product);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id_product === product.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id_product !== id));
  };

  // Update Quantity
  const updateQuantity = (id, quantity) => {
    setCart(cart.map((item) =>
      item.id_product === id ? { ...item, quantity } : item
    ));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
