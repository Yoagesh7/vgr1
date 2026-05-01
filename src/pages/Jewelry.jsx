import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../data/products';
import './Shop.css';

const Jewelry = ({ addToCart }) => {
  const products = useProducts();
  const jewelryProducts = products.filter(p => p.category === 'Jewelry');

  return (
    <div className="shop-page page-enter-active">
      <div className="shop-header motif-bg">
        <div className="container">
          <h1>Fine Jewelry</h1>
          <p>Adorn yourself in heritage pieces that complete your traditional look.</p>
        </div>
      </div>

      <div className="container shop-container">
        <div className="shop-sidebar">
          <h3>Filter by</h3>
          
          <div className="filter-group">
            <h4>Type</h4>
            <ul>
              <li><label><input type="checkbox" /> Necklaces</label></li>
              <li><label><input type="checkbox" /> Earrings</label></li>
              <li><label><input type="checkbox" /> Bangles</label></li>
              <li><label><input type="checkbox" /> Bridal Sets</label></li>
            </ul>
          </div>
        </div>

        <div className="shop-content">
          <div className="shop-controls">
            <p>Showing {jewelryProducts.length} results</p>
            <select className="sort-select">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="product-grid">
            {jewelryProducts.map(product => (
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

export default Jewelry;
