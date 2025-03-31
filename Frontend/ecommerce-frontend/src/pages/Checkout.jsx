import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  const getTotalPrice = () => cart.length > 0 
      ? cart.reduce((total, item) => total + item.price * item.quantity, 0) 
      : 0;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer,
      cart,
      total: getTotalPrice(),
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={customer.name} placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" value={customer.email} placeholder="Email" required onChange={handleChange} />
        <input type="text" name="address" value={customer.address} placeholder="Shipping Address" required onChange={handleChange} />
        
        <label>Payment Method:</label>
        <select name="paymentMethod" value={customer.paymentMethod} onChange={handleChange}>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
        <button type="submit" disabled={cart.length === 0}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
