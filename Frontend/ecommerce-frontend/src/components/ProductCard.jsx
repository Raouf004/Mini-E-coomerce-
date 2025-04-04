import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-4 hover:shadow-2xl transition duration-300">
      {/* Wrap the image + name with Link to product details */}
      <Link to={`/product/${product.id_product}`}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 text-sm">{product.category}</p>
        </div>
      </Link>
      <div className="flex justify-between items-center px-4 pb-2">
        <span className="text-xl font-bold text-green-600">${product.price}</span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
