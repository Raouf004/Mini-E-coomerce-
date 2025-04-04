import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <img
        src={product.image || "https://via.placeholder.com/500"}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-gray-700">{product.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-2xl font-bold text-green-600">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
