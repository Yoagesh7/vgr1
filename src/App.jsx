import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import NewArrivals from './pages/NewArrivals';
import Sarees from './pages/Sarees';
import Lehengas from './pages/Lehengas';
import Jewelry from './pages/Jewelry';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Curations from './pages/Curations';
import SilkCottons from './pages/SilkCottons';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';
import { useState } from 'react';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/new-arrivals" element={<NewArrivals addToCart={addToCart} />} />
            <Route path="/sarees" element={<Sarees addToCart={addToCart} />} />
            <Route path="/lehengas" element={<Lehengas addToCart={addToCart} />} />
            <Route path="/jewelry" element={<Jewelry addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/curations" element={<Curations addToCart={addToCart} />} />
            <Route path="/silk-cottons" element={<SilkCottons addToCart={addToCart} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
