import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ChevronRight, Star, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useProducts } from '../data/products';
import './ProductDetails.css';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const products = useProducts();
  const product = products.find(p => p.id === parseInt(id, 10)) || products[0];

  if (!product) {
    return (
      <div className="product-details-page animate-fade-in">
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <h2>No product available</h2>
          <p>Please add products from admin dashboard.</p>
          <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
        </div>
      </div>
    );
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = [
    { id: 1, user: 'Anjali S.', rating: 5, comment: 'The quality of the silk is outstanding. The colors are even more vibrant than in the photos!', date: 'Oct 12, 2023' },
    { id: 2, user: 'Priya M.', rating: 4, comment: 'Beautiful saree, perfect for my brothers wedding. Delivery was very fast.', date: 'Nov 05, 2023' },
    { id: 3, user: 'Meera R.', rating: 5, comment: 'Authentic handloom feel. I love the intricate zari work.', date: 'Dec 20, 2023' }
  ];

  return (
    <div className="product-details-page animate-fade-in">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>

        <div className="product-details-grid">
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="thumbnail-list">
              <img src={product.image} alt="Thumb" className="active" />
              <img src="/assets/category_sarees_1777553957867.png" alt="Thumb" />
            </div>
          </div>

          <div className="product-info-panel">
            <div className="product-badge">Handcrafted Heritage</div>
            <h1>{product.name}</h1>
            
            <div className="rating-summary">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "#d4af37" : "none"} color="#d4af37" />)}
              </div>
              <span>(4.8 / 5 from {reviews.length} reviews)</span>
            </div>

            <p className="price">₹{product.price}</p>
            
            <div className="description">
              <h3>About This Product</h3>
              <p>This exquisite {product.name} is a testament to Indias rich weaving tradition. Handcrafted using premium {product.category.toLowerCase()} techniques, it features a luxuriously soft texture and a stunning drape that defines elegance.</p>
              <ul>
                <li><strong>Material:</strong> 100% Pure Handloom Silk</li>
                <li><strong>Work:</strong> Genuine Gold Zari Weaving</li>
                <li><strong>Length:</strong> 6.3 Meters (Including Blouse Piece)</li>
                <li><strong>Occasion:</strong> Bridal, Festive, Grand Occasions</li>
              </ul>
            </div>

            <div className="product-options">
              <div className="option-group">
                <h4>Select Size</h4>
                <div className="size-options">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button key={size} className={`size-btn ${product.size === size ? 'active' : ''}`}>{size}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary btn-full" onClick={addToCart}>
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="btn btn-outline icon-btn">
                <Heart size={20} />
              </button>
              <button className="btn btn-outline icon-btn">
                <Share2 size={20} />
              </button>
            </div>

            <div className="trust-badges">
              <div className="badge-item"><Truck size={20} /> <span>Free Shipping</span></div>
              <div className="badge-item"><ShieldCheck size={20} /> <span>Authenticity Guaranteed</span></div>
              <div className="badge-item"><RefreshCcw size={20} /> <span>7-Day Returns</span></div>
            </div>

            <div className="product-meta">
              <p><strong>SKU:</strong> VGR-{product.category.substring(0,3).toUpperCase()}-{product.id}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Availability:</strong> In Stock</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="product-extra-section reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-container">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="user-name">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < review.rating ? "#d4af37" : "none"} color="#d4af37" />)}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Similar Products */}
        <section className="product-extra-section similar-section">
          <h2>Similar Products</h2>
          <div className="product-grid">
            {similarProducts.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-image-container">
                  <Link to={`/product/${p.id}`}>
                    <img src={p.image} alt={p.name} />
                  </Link>
                </div>
                <div className="product-info">
                  <Link to={`/product/${p.id}`}>
                    <h3>{p.name}</h3>
                  </Link>
                  <p className="price">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;

