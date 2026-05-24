/**
 * Dynamically resolves local asset paths to work under any base path deployment (e.g. Vercel root or GitHub Pages subfolders).
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  // Normalize the path by removing any leading slash
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Retrieve the base URL injected by Vite
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Ensure the base URL ends with a slash and combine
  const formattedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  return `${formattedBase}${cleanPath}`;
};
