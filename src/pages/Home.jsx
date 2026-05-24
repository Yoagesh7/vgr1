import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

import { useProducts } from '../data/products';
import { getAssetUrl } from '../utils';

const Home = ({ addToCart }) => {
  const products = useProducts();
  
  const heroSlides = [
    {
      type: 'video',
      src: getAssetUrl('/assets/hero-media/L1.mp4'),
      poster: getAssetUrl('/assets/hero-media/l1_poster.png'),
      title: 'Cinematic Elegance',
      subtitle: 'Experience the flow of pure silk in motion. Crafted for the modern muse.',
      fontFamily: "'Cinzel', serif",
      btnText: 'Watch Collection'
    },
    {
      type: 'image',
      src: getAssetUrl('/assets/hero-media/pexels-amit-chowdhury-2402860-6786973.jpg'),
      title: 'Timeless Traditions',
      subtitle: 'Discover the finest collection of handcrafted Indian sarees, woven with tradition and modern luxury.',
      fontFamily: "'Playfair Display', serif",
      btnText: 'Shop Sarees'
    },
    {
      type: 'video',
      src: getAssetUrl('/assets/hero-media/L2.mp4'),
      poster: getAssetUrl('/assets/hero-media/l2_poster.png'),
      title: 'The Art of Weaving',
      subtitle: 'Every thread tells a story of heritage and masterful craftsmanship.',
      fontFamily: "'Cormorant Garamond', serif",
      btnText: 'Explore Heritage'
    },
    {
      type: 'image',
      src: getAssetUrl('/assets/hero-media/pexels-arif-5377395.jpg'),
      title: 'Modern Grace',
      subtitle: 'Where contemporary design meets classical beauty in perfect harmony.',
      fontFamily: "'Inter', sans-serif",
      btnText: 'View Designs'
    },
    {
      type: 'image',
      src: getAssetUrl('/assets/hero-media/pexels-deepak-sharma-503041381-35963173.jpg'),
      title: 'Festive Radiance',
      subtitle: 'Light up every celebration with colors that speak to the soul.',
      fontFamily: "'Cinzel', serif",
      btnText: 'Festive Edit'
    }
  ];

  const [currentHero, setCurrentHero] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentHero((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentHero((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndPos = e.changedTouches[0].clientX;
    const difference = touchStart - touchEndPos;
    const swipeThreshold = 50;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swiped left, show next slide
        nextSlide();
      } else {
        // Swiped right, show previous slide
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000); // 7 seconds for all media
    return () => clearInterval(timer);
  }, [nextSlide, currentHero]);

  const handleVideoHover = (e) => {
    e.currentTarget.play().catch((err) => {
      console.log('Video play interrupted:', err);
    });
  };

  const handleVideoLeave = (e) => {
    e.currentTarget.pause();
  };

  const currentSlide = heroSlides[currentHero];

  const videos = [
    '/assets/videos/12730387_1080_1920_30fps.mp4',
    '/assets/videos/14800105_2160_3840_60fps.mp4',
    '/assets/videos/14929529_1080_1920_30fps.mp4',
    '/assets/videos/7184195-uhd_2160_3840_25fps.mp4',
    '/assets/videos/8750557-uhd_2160_4096_24fps.mp4',
    '/assets/videos/8751959-uhd_2160_4096_24fps.mp4'
  ].map(getAssetUrl);

  const categories = [
    { name: 'Bridal Sarees', image: '/assets/portrait-young-woman-wearing-tradition-sari-garment.jpg' },
    { name: 'Kanjeevaram Silk', image: '/assets/young-indian-woman-wearing-sari.jpg' },
    { name: 'Banarasi Silk', image: '/assets/abhay-RQP_M6unWpA-unsplash.jpg' },
    { name: 'Silk Cottons', image: '/assets/bulbul-ahmed-8yawVKD8xf4-unsplash.jpg' },
    { name: 'Lehengas', image: '/assets/bulbul-ahmed-9rPam0CAYgM-unsplash.jpg' },
    { name: 'Designer Wear', image: '/assets/graphics-anywhere-k7Kdss__aDg-unsplash.jpg' }
  ].map(cat => ({ ...cat, image: getAssetUrl(cat.image) }));

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section 
        className="hero"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === currentHero ? 'active' : ''}`}
          >
            {slide.type === 'video' ? (
              idx === currentHero ? (
                <video 
                  key={slide.src}
                  src={slide.src}
                  autoPlay 
                  muted 
                  loop
                  playsInline 
                  preload="auto"
                  className="hero-media" 
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={slide.poster} alt={slide.title} className="hero-media" />
              )
            ) : (
              <img 
                src={slide.src} 
                alt={slide.title} 
                className="hero-media" 
                loading={idx === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}
        
        <div className="hero-overlay"></div>
        
        {/* Navigation Arrows */}
        <button className="hero-nav-btn prev" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={36} />
        </button>
        <button className="hero-nav-btn next" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={36} />
        </button>

        <div className="container hero-content">
          <div className="hero-carousel-indicators">
            {heroSlides.map((_, idx) => (
              <span 
                key={idx} 
                className={`indicator ${idx === currentHero ? 'active' : ''}`}
                onClick={() => setCurrentHero(idx)}
              ></span>
            ))}
          </div>
          <h1 style={{ fontFamily: currentSlide.fontFamily }}>{currentSlide.title}</h1>
          <p>{currentSlide.subtitle}</p>
          <Link to="/shop" className="btn btn-primary">{currentSlide.btnText}</Link>
        </div>
      </section>

      {/* Saree Border Divider */}
      <div className="saree-border-divider"></div>

      {/* Categories Section */}
      <section className="section categories motif-bg">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/shop?category=${encodeURIComponent(cat.name)}`} 
                className="category-card"
              >
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <h3 className="category-title">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section products">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="product-grid">
            {products.slice(0, 16).map(product => (
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
          <div className="view-more">
            <Link to="/shop" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section videos motif-bg">
        <div className="container">
          <h2 className="section-title">VGR Shorts</h2>
        </div>
        <div className="video-grid-full shorts-view">
          {videos.map((vid, idx) => (
            <div key={idx} className="video-card short-card">
              <div className="video-wrapper">
                <video 
                  src={vid}
                  autoPlay
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  className="short-video"
                  onClick={(e) => {
                    if (e.currentTarget.paused) {
                      e.currentTarget.play().catch((err) => console.log(err));
                    } else {
                      e.currentTarget.pause();
                    }
                  }}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                  <PlayCircle size={48} className="play-icon-mini" />
                </div>
              </div>
              <div className="video-info">
                <h3>Exquisite Collection {idx + 1}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>      {/* Exclusive Curations Section */}
      <section className="section curations">
        <div className="container">
          <h2 className="section-title elegant-title">PRASHANTI's Exclusive Curations</h2>
          <div className="curations-grid">
            <div className="curation-card">
              <div className="curation-image">
                <img src={getAssetUrl('/assets/portrait-young-woman-wearing-tradition-sari-garment.jpg')} alt="Niraa Deepavali Edit" />
              </div>
              <Link to="/curations" className="curation-link">Niraa - Deepavali 2025 Edit <span className="arrow">&gt;</span></Link>
            </div>
            <div className="curation-card">
              <div className="curation-image">
                <img src={getAssetUrl('/assets/young-indian-woman-wearing-sari.jpg')} alt="Swara Edition 3" />
              </div>
              <Link to="/curations" className="curation-link">Swara Edition 3 <span className="arrow">&gt;</span></Link>
            </div>
            <div className="curation-card">
              <div className="curation-image">
                <img src={getAssetUrl('/assets/abhay-RQP_M6unWpA-unsplash.jpg')} alt="Niraa 2024" />
              </div>
              <Link to="/curations" className="curation-link">Niraa 2024 <span className="arrow">&gt;</span></Link>
            </div>
            <div className="curation-card">
              <div className="curation-image">
                <img src={getAssetUrl('/assets/graphics-anywhere-k7Kdss__aDg-unsplash.jpg')} alt="Swara Edition 2" />
              </div>
              <Link to="/curations" className="curation-link">Swara - Edition 2 <span className="arrow">&gt;</span></Link>
            </div>
            <div className="curation-card">
              <div className="curation-image">
                <img src={getAssetUrl('/assets/bulbul-ahmed-Z528f1BWM00-unsplash.jpg')} alt="Swara Edition 1" />
              </div>
              <Link to="/curations" className="curation-link">Swara - Edition 1 <span className="arrow">&gt;</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about">
        <div className="container about-container">
          <div className="about-image">
            <img src={getAssetUrl('/assets/hero_banner_1777553940370.png')} alt="About Us" />
          </div>
          <div className="about-content">
            <h2>Our Heritage</h2>
            <p>VGR Boutique was born out of a passion for preserving the rich, vibrant traditions of Indian textile art. For decades, we have worked directly with master weavers to bring you authentic, pure silk sarees and exquisite lehengas.</p>
            <p>Each piece in our collection tells a story of craftsmanship, dedication, and luxury. We believe in providing an experience that celebrates the true beauty of Indian culture.</p>
            <Link to="/about" className="btn btn-secondary">Read Our Story</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
