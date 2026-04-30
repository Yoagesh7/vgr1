import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Shop.css';

const Sarees = ({ addToCart }) => {
  // Show a subset of products for Sarees
  const sareeProducts = products.slice(0, 12); 

  return (
    <div className="shop-page page-enter-active">
      <div className="shop-header motif-bg">
        <div className="container">
          <h1>Premium Sarees</h1>
          <p>Six yards of pure elegance and tradition.</p>
        </div>
      </div>

      <div className="container shop-container">
        <div className="shop-sidebar">
          <h3>Filter by</h3>
          
          <div className="filter-group">
            <h4>Fabric</h4>
            <ul>
              <li><label><input type="checkbox" /> Kanjeevaram</label></li>
              <li><label><input type="checkbox" /> Banarasi</label></li>
              <li><label><input type="checkbox" /> Georgette</label></li>
              <li><label><input type="checkbox" /> Silk Cotton</label></li>
            </ul>
          </div>
        </div>

        <div className="shop-content">
          <div className="shop-controls">
            <p>Showing {sareeProducts.length} results</p>
            <select className="sort-select">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="product-grid">
            {sareeProducts.map(product => (
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

export default Sarees;
