import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 2.2 seconds display time for luxury showcase
    const displayTimer = setTimeout(() => {
      setFade(true);
    }, 2200);

    // 3.0 seconds total time before completely unmounting
    const unmountTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div className={`preloader-container ${fade ? 'fade-out' : ''}`}>
      {/* Top Royal Saree Borders stacked */}
      <div className="preloader-border top">
        <div className="zari-edge"></div>
        <div className="zari-temple"></div>
        <div className="zari-jaal"></div>
      </div>

      {/* Main Luxury Brand Identity in the center */}
      <div className="preloader-shield">
        {/* Handcrafted Golden Lotus SVG Icon */}
        <div className="preloader-logo">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#aa771c" />
                <stop offset="25%" stopColor="#f3e5ab" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="75%" stopColor="#f6e4a6" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
            </defs>
            {/* Elegant Outer Leaf Outlines */}
            <path 
              d="M50 15 C50 15 32 38 32 58 C32 68 40 76 50 76 C60 76 68 68 68 58 C68 38 50 15 50 15 Z" 
              stroke="url(#goldGradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {/* Left Wing Lotus Petal */}
            <path 
              d="M50 32 C42 42 22 50 22 64 C22 72 29 78 37 78 C45 78 49 72 50 68" 
              stroke="url(#goldGradient)" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            {/* Right Wing Lotus Petal */}
            <path 
              d="M50 32 C58 42 78 50 78 64 C78 72 71 78 63 78 C55 78 51 72 50 68" 
              stroke="url(#goldGradient)" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            {/* Inner Core Petals */}
            <path 
              d="M50 42 C46 48 38 53 38 65 C38 71 43 75 50 75 C57 75 62 71 62 65 C62 53 54 42 50 42 Z" 
              stroke="url(#goldGradient)" 
              strokeWidth="1.2" 
              fill="rgba(212, 175, 55, 0.05)"
            />
            {/* Royal Weaving Loom Warp Lines beneath the Lotus */}
            <line x1="50" y1="76" x2="50" y2="88" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 85 C45 88 55 88 60 85" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Shining Gold Brand Title */}
        <h1 className="preloader-title">VGR</h1>
        
        {/* Luxury Subtitle */}
        <p className="preloader-subtitle">Pure Silks • Handwoven Heritage</p>
        
        {/* Glowing Progress Spinner */}
        <div className="preloader-spinner"></div>
      </div>

      {/* Bottom Royal Saree Borders stacked (Symmetric inversion) */}
      <div className="preloader-border bottom">
        <div className="zari-jaal"></div>
        <div className="zari-temple"></div>
        <div className="zari-edge"></div>
      </div>
    </div>
  );
};

export default Preloader;
