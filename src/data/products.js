import { useEffect, useState } from 'react';

export const productImages = [
  '/assets/product_saree_1777553991410.png',
  '/assets/product_saree_2_1777555133419.png',
  '/assets/product_saree_3_1777555194294.png',
  '/assets/product_saree_4_1777555210995.png',
  '/assets/product_saree_5_1777555231558.png',
  '/assets/product_saree_6_1777555249683.png',
  '/assets/product_saree_7_1777555265007.png',
  '/assets/product_saree_8_1777555280446.png'
];

const STORAGE_KEY = 'vgr_products';

export const createDefaultProducts = () => Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  name: i < 8 ? [
    'Royal Kanjeevaram Silk',
    'Midnight Blue Banarasi',
    'Saffron Heritage Silk',
    'Ebony Designer Saree',
    'Pastel Floral Cotton',
    'Imperial Purple Silk',
    'Blush Pink Chiffon',
    'White & Gold Kerala Silk'
  ][i] : `Premium Silk Saree ${i + 1}`,
  price: (Math.random() * 5000 + 1000).toFixed(0),
  image: productImages[i % productImages.length],
  category: ['Sarees', 'Lehengas', 'Jewelry', 'Designer Wear'][i % 4],
  size: ['S', 'M', 'L', 'XL'][i % 4],
  stock: Math.floor(Math.random() * 50 + 5),
  description: 'Premium handcrafted product'
}));

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

export const saveProductsToStorage = (updatedProducts) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  window.dispatchEvent(new Event('vgr-products-updated'));
};

export const products = getProductsFromStorage();

export const useProducts = () => {
  const [liveProducts, setLiveProducts] = useState(getProductsFromStorage());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncProducts = () => {
      setLiveProducts(getProductsFromStorage());
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
