import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Shop.css';

const NewArrivals = ({ addToCart }) => {
  // Show first 8 products for New Arrivals
  const newProducts = products.slice(0, 8); 

  return (
    <div className="shop-page page-enter-active">
      <div className="shop-header motif-bg">
        <div className="container">
          <h1>New Arrivals</h1>
          <p>The latest additions to our premium heritage collection.</p>
        </div>
      </div>

      <div className="container shop-container">
        <div className="shop-sidebar">
          <h3>Categories</h3>
          <div className="filter-group">
            <ul>
              <li><label><input type="checkbox" /> All New</label></li>
              <li><label><input type="checkbox" /> Sarees</label></li>
              <li><label><input type="checkbox" /> Lehengas</label></li>
              <li><label><input type="checkbox" /> Accessories</label></li>
            </ul>
          </div>
        </div>

        <div className="shop-content">
          <div className="shop-controls">
            <p>Showing {newProducts.length} results</p>
            <select className="sort-select">
              <option>Sort by: Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="product-grid">
            {newProducts.map(product => (
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
    </div>
  );
};

export default NewArrivals;
