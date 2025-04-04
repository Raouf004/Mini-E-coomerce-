import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product); // Check if this logs when clicking
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id_product} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* 🛒 Display Cart Items */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id_product} className="flex justify-between border-b p-2">
                <span>
                  {item.name} ({item.quantity})
                </span>
                <span className="font-bold">${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
