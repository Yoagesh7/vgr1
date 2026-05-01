import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../data/products';
import './Shop.css';

const Shop = ({ addToCart }) => {
  const products = useProducts();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filter, setFilter] = useState({
    category: categoryParam || 'All',
    size: 'All'
  });

  // Update filter if categoryParam changes
  useEffect(() => {
    if (categoryParam) {
      setFilter(prev => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const categories = ['All', 'Bridal Sarees', 'Kanjeevaram Silk', 'Banarasi Silk', 'Designer Wear'];
  const sizes = ['All', 'S', 'M', 'L', 'XL'];

  const filteredProducts = products.filter(p => {
    return (filter.category === 'All' || p.category === filter.category) &&
           (filter.size === 'All' || p.size === filter.size);
  });

  return (
    <div className="shop-page animate-fade-in">
      <div className="shop-header motif-bg">
        <div className="container">
          <h1>Shop Our Collection</h1>
          <p>Handpicked heritage sarees for every occasion</p>
        </div>
      </div>

      <div className="container shop-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Category</h3>
            <div className="filter-options">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${filter.category === cat ? 'active' : ''}`}
                  onClick={() => setFilter({ ...filter, category: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Size</h3>
            <div className="filter-options size-options">
              {sizes.map(size => (
                <button 
                  key={size} 
                  className={`filter-btn ${filter.size === size ? 'active' : ''}`}
                  onClick={() => setFilter({ ...filter, size: size })}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="shop-content">
          <div className="shop-meta">
            <p>Showing {filteredProducts.length} products</p>
          </div>
          
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <button className="add-to-cart-btn" onClick={addToCart}>
                    Add to Cart
                  </button>
                </div>
                <div className="product-info">
                  <Link to={`/product/${product.id}`}>
                    <h3>{product.name}</h3>
                  </Link>
                  <div className="product-meta-small">
                    <span>{product.category}</span>
                    <span>Size: {product.size}</span>
                  </div>
                  <p className="price">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found matching your filters.</p>
              <button className="btn btn-outline" onClick={() => setFilter({ category: 'All', size: 'All' })}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
