import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  // Dummy cart data
  const cartItems = [
    { id: 1, name: 'Premium Silk Saree 1', price: 350.00, quantity: 1, image: '/assets/product_saree_1777553991410.png' },
    { id: 2, name: 'Premium Silk Saree 2', price: 420.00, quantity: 1, image: '/assets/category_sarees_1777553957867.png' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="cart-page animate-fade-in">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        
        <div className="cart-grid">
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-product">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price.toFixed(2)}</p>
                    <button className="remove-btn"><Trash2 size={16} /> Remove</button>
                  </div>
                </div>
                
                <div className="cart-item-quantity">
                  <div className="quantity-controls">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                </div>
                
                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="continue-shopping">
              <Link to="/" className="btn btn-outline">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-full checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
