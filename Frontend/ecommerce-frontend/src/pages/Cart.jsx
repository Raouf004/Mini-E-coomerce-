import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import '../styles/Cart.css'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const getTotalPrice = () => cart.length > 0 
      ? cart.reduce((total, item) => total + item.price * item.quantity, 0) 
      : 0;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go Shopping</Link></p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <p>
                Quantity: 
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          <button onClick={clearCart} disabled={cart.length === 0}>Clear Cart</button>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
