/**
 * Resolves local image URLs to load from the backend server dynamically.
 * Handles development (localhost:5000) and production base URLs.
 */
export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  // Local static frontend assets in /public should bypass backend routing
  if (
    url.startsWith('/vastu_tips/') || 
    url.startsWith('/home_hero_jyotish') ||
    url.startsWith('/about_profile') ||
    url.startsWith('/about_photo') ||
    url.startsWith('/about_journey') ||
    url.startsWith('/rudrajyotishlogo') ||
    url.startsWith('/rudralogo') ||
    url.startsWith('/astrology_') ||
    url.startsWith('/numerology_') ||
    url.startsWith('/relationship_') ||
    url.startsWith('/tarot_') ||
    url.startsWith('/vastu_') ||
    url.startsWith('/favicon.svg') ||
    url.startsWith('/icons.svg')
  ) {
    return url;
  }
  
  // Find server base URL from VITE_API_URL (e.g. "http://localhost:5000/api/v1")
  const apiUrl = import.meta.env.VITE_API_URL || '';
  let serverBase = 'http://localhost:5000'; // Default fallback
  
  if (apiUrl.startsWith('http')) {
    // Extract base URL (everything before /api)
    const apiIndex = apiUrl.indexOf('/api');
    if (apiIndex !== -1) {
      serverBase = apiUrl.substring(0, apiIndex);
    } else {
      serverBase = apiUrl;
    }
  } else if (typeof window !== 'undefined') {
    // If relative API URL, use current window host
    serverBase = `${window.location.protocol}//${window.location.host}`;
  }

  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${serverBase}${cleanUrl}`;
};
