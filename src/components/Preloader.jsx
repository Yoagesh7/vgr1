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
        {/* Handcrafted Golden Shree (श्री) & Saree Drape SVG Icon */}
        <div className="preloader-logo">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#aa771c" />
                <stop offset="25%" stopColor="#f3e5ab" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="75%" stopColor="#f6e4a6" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Elegant Flowing Saree Pleats / Drape curves circling the Shree icon */}
            <path 
              d="M20,68 C20,95 48,102 60,102 C85,102 102,88 102,70 C102,52 85,45 70,42" 
              stroke="url(#goldGradient)" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <path 
              d="M23,73 C23,98 50,105 60,105 C88,105 105,92 105,73 C105,58 92,49 75,45" 
              stroke="url(#goldGradient)" 
              strokeWidth="1" 
              strokeDasharray="3,3"
              opacity="0.8"
              strokeLinecap="round"
            />
            <path 
              d="M15,62 C15,85 38,95 50,95 C75,95 90,82 90,68" 
              stroke="url(#goldGradient)" 
              strokeWidth="1.2" 
              opacity="0.6"
              strokeLinecap="round"
            />

            {/* Traditional Sanskrit "Shree" (श्री) Calligraphy */}
            <g transform="translate(10, 8)">
              {/* Shirorekha (Top horizontal line) */}
              <path 
                d="M30,35 L70,35" 
                stroke="url(#goldGradient)" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                filter="url(#goldGlow)"
              />
              
              {/* Vertical stem */}
              <path 
                d="M52,35 L52,70" 
                stroke="url(#goldGradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
              
              {/* Shra loop & diagonal stroke */}
              <path 
                d="M52,43 C42,43 35,37 35,46 C35,53 43,53 52,49" 
                stroke="url(#goldGradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M46,47 L34,60" 
                stroke="url(#goldGradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
              
              {/* Vowel sign 'ee' (ी matra) curve wrapping to vertical stem */}
              <path 
                d="M52,35 C58,18 70,18 70,35 L70,70" 
                stroke="url(#goldGradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
              
              {/* Gold Bindu Dot */}
              <circle 
                cx="61" 
                cy="22" 
                r="3.2" 
                fill="url(#goldGradient)" 
                filter="url(#goldGlow)"
              />
            </g>
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
