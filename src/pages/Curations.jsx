import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../data/products';
import './Shop.css';

const Curations = ({ addToCart }) => {
  const products = useProducts();
  // Let's just use some products for demonstration
  const curationProducts = products.slice(4, 12);

  return (
    <div className="shop-page animate-fade-in">
      <div className="shop-header">
        <div className="container">
          <h1>PRASHANTI's Exclusive Curations</h1>
          <p>Handpicked collections for the discerning eye</p>
        </div>
      </div>
      
      <div className="container">
        <div className="shop-meta">
          Showing all {curationProducts.length} curated results
        </div>
        
        <div className="product-grid" style={{ marginBottom: '6rem' }}>
          {curationProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <button className="add-to-cart-btn" onClick={addToCart}>
                  Add to Cart
                </button>
                <Link to={`/product/${product.id}`} className="view-product-btn">
                  View Details
                </Link>
              </div>
              <div className="product-info">
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="price">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curations;
