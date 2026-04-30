import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Shop.css';

const SilkCottons = ({ addToCart }) => {
  // Let's filter some products
  const silkCottonProducts = products.filter(p => p.category === 'Sarees').slice(0, 8);

  return (
    <div className="shop-page animate-fade-in">
      <div className="shop-header">
        <div className="container">
          <h1>Silk Cottons</h1>
          <p>The Everyday Luxury Store</p>
        </div>
      </div>
      
      <div className="container">
        <div className="shop-meta" style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '1.1rem' }}>
          For the woman who values tradition, but chooses comfort. For the saree that moves with you, not against you.
        </div>
        
        <div className="product-grid" style={{ marginBottom: '6rem' }}>
          {silkCottonProducts.map(product => (
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

export default SilkCottons;
