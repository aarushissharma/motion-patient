// Configuration for Deployed Motion-Patient App
// Add this code to your deployed app's config.js file

// Check if API URL is provided via URL parameter (for easy configuration)
const urlParams = new URLSearchParams(window.location.search);
const apiUrlFromUrl = urlParams.get('api_url');

// Check if API URL is in environment variable (Vercel/Next.js)
const apiUrlFromEnv = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL
  : null;

// Default configuration
const WATCHFUL_CONFIG = {
  // API base URL - can be set via:
  // 1. URL parameter: ?api_url=https://your-backend-url
  // 2. Environment variable: NEXT_PUBLIC_API_URL
  // 3. localStorage: watchful_api_url
  // 4. This default value
  API_BASE_URL: apiUrlFromUrl || apiUrlFromEnv || 'http://localhost:5001',
  
  PATIENT_ID: 'patient_demo',
  CAREGIVER_ID: 'caregiver_demo',
  ENABLED: true
};

// Function to get the API base URL
function getWatchfulApiUrl() {
  // Priority order:
  // 1. URL parameter (highest priority - for testing)
  // 2. Environment variable (for production)
  // 3. localStorage (user setting)
  // 4. Config default (fallback)
  
  if (apiUrlFromUrl) {
    localStorage.setItem('watchful_api_url', apiUrlFromUrl);
    return apiUrlFromUrl;
  }
  
  if (apiUrlFromEnv) {
    localStorage.setItem('watchful_api_url', apiUrlFromEnv);
    return apiUrlFromEnv;
  }
  
  const savedUrl = localStorage.getItem('watchful_api_url');
  if (savedUrl) {
    return savedUrl;
  }
  
  return WATCHFUL_CONFIG.API_BASE_URL;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WATCHFUL_CONFIG, getWatchfulApiUrl };
}
