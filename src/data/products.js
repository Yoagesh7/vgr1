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

export const products = Array.from({ length: 32 }, (_, i) => ({
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
  size: ['S', 'M', 'L', 'XL'][i % 4]
}));
