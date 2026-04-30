import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="nav-left">
          <Menu className="menu-icon" onClick={toggleMenu} />
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/new-arrivals" onClick={closeMenu}>New Arrivals</Link>
            <Link to="/sarees" onClick={closeMenu}>Sarees</Link>
            <Link to="/lehengas" onClick={closeMenu}>Lehengas</Link>
            <Link to="/jewelry" onClick={closeMenu}>Jewelry</Link>
          </nav>
        </div>
        
        <div className="nav-logo">
          <Link to="/">
            <h1>VGR</h1>
            <span>BOUTIQUE</span>
          </Link>
        </div>

        <div className="nav-right">
          <Search className="icon" />
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingBag className="icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
