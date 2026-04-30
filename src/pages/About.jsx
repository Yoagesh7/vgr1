import React from 'react';
import './Shop.css'; // Reuse basic styling

const About = () => {
  return (
    <div className="shop-page animate-fade-in">
      <div className="shop-header">
        <div className="container">
          <h1>Our Story</h1>
          <p>Discover the heritage behind VGR Boutique</p>
        </div>
      </div>
      
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="about-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title elegant-title">A Legacy of Silk</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            VGR Boutique was born out of a passion for preserving the rich, vibrant traditions of Indian textile art. For decades, we have worked directly with master weavers to bring you authentic, pure silk sarees and exquisite lehengas.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            Each piece in our collection tells a story of craftsmanship, dedication, and luxury. We believe in providing an experience that celebrates the true beauty of Indian culture.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)' }}>
            Thank you for being part of our journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
