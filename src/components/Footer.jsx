import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer motif-bg">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>VGR <span>BOUTIQUE</span></h2>
            <p>Elegance woven into every thread. Authentic Indian heritage meets modern luxury.</p>
            <div className="social-links">
              <a href="#">IG</a>
              <a href="#">FB</a>
              <a href="#">X</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/">New Arrivals</Link></li>
              <li><Link to="/">Sarees</Link></li>
              <li><Link to="/">Lehengas</Link></li>
              <li><Link to="/">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Assistance</h3>
            <ul>
              <li><Link to="/">Track Order</Link></li>
              <li><Link to="/">Shipping & Returns</Link></li>
              <li><Link to="/">Size Guide</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-secondary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VGR Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
