import { useEffect, useState } from 'react';

export const productImages = [
  '/assets/portrait-young-woman-wearing-tradition-sari-garment.jpg',
  '/assets/young-indian-woman-wearing-sari.jpg',
  '/assets/abhay-RQP_M6unWpA-unsplash.jpg',
  '/assets/graphics-anywhere-k7Kdss__aDg-unsplash.jpg',
  '/assets/bulbul-ahmed-8yawVKD8xf4-unsplash.jpg',
  '/assets/bulbul-ahmed-9rPam0CAYgM-unsplash.jpg',
  '/assets/bulbul-ahmed-HMQpUMuZ0zs-unsplash.jpg',
  '/assets/bulbul-ahmed-Z528f1BWM00-unsplash.jpg',
  '/assets/bulbul-ahmed-ohEYtC4TEsg-unsplash.jpg',
  '/assets/bulbul-ahmed-SiQTqnp-qd8-unsplash.jpg',
  '/assets/bulbul-ahmed-tcg3FrrxlSg-unsplash.jpg'
];

const STORAGE_KEY = 'vgr_products_v2';

export const createDefaultProducts = () => Array.from({ length: 33 }, (_, i) => {
  const imageIndex = i % productImages.length;
  const names = [
    'Golden Heritage Banarasi Saree',
    'Emerald Green Kanjeevaram Silk',
    'Crimson Handwoven Silk Saree',
    'Royal Indigo Designer Saree',
    'Saffron Korvai Silk Cotton',
    'Maroon Wedding Zari Lehenga',
    'Pastel Pink Festive Curation',
    'Exquisite Royal Blue Silk',
    'Amber Gold Kuppadam Saree',
    'Jacquard Floral Silk Saree',
    'Scarlet Banarasi Brocade'
  ];

  return {
    id: i + 1,
    name: names[imageIndex] || `Premium Heritage Saree ${i + 1}`,
    price: (Math.random() * 5000 + 3000).toFixed(0),
    image: productImages[imageIndex],
    category: ['Bridal Sarees', 'Kanjeevaram Silk', 'Banarasi Silk', 'Designer Wear'][i % 4],
    size: ['S', 'M', 'L', 'XL'][i % 4],
    stock: Math.floor(Math.random() * 50 + 5),
    description: 'Breathtaking handloom creation crafted with pure love, fine silk threads, and traditional Indian artistry. Perfect for weddings, celebrations, and festive events.'
  };
});

export const getProductsFromStorage = () => {
  if (typeof window === 'undefined') {
    return createDefaultProducts();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaults = createDefaultProducts();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to read products from storage:', error);
  }

  const fallback = createDefaultProducts();
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
  }
  return fallback;
};

import { getAssetUrl } from '../utils';

export const saveProductsToStorage = (updatedProducts) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  window.dispatchEvent(new Event('vgr-products-updated'));
};

export const products = getProductsFromStorage().map(p => ({ ...p, image: getAssetUrl(p.image) }));

export const useProducts = () => {
  const [liveProducts, setLiveProducts] = useState(() => 
    getProductsFromStorage().map(p => ({ ...p, image: getAssetUrl(p.image) }))
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncProducts = () => {
      setLiveProducts(getProductsFromStorage().map(p => ({ ...p, image: getAssetUrl(p.image) })));
    };

    window.addEventListener('storage', syncProducts);
    window.addEventListener('vgr-products-updated', syncProducts);

    return () => {
      window.removeEventListener('storage', syncProducts);
      window.removeEventListener('vgr-products-updated', syncProducts);
    };
  }, []);

  return liveProducts;
};
