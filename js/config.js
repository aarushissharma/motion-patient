// API Configuration for Watchful Backend
// Connect to the watchful backend API

// Check for API URL from URL parameter (for deployed app configuration)
const urlParams = new URLSearchParams(window.location.search);
const apiUrlFromUrl = urlParams.get('api_url');

// FORCE CLEAR any cached wrong port values immediately
(function() {
  // If URL parameter provided, use it (for deployed app)
  if (apiUrlFromUrl) {
    localStorage.setItem('watchful_api_url', apiUrlFromUrl);
    console.log('✅ [URL PARAM] Using API URL from URL parameter:', apiUrlFromUrl);
    return;
  }
  
  // Detect if we're on Vercel
  const isVercel = window.location.hostname.includes('vercel.app');
  const correctUrl = isVercel 
    ? window.location.origin  // Use Vercel domain when deployed
    : 'http://localhost:3001'; // Local server for development
  
  const cachedUrl = localStorage.getItem('watchful_api_url');
  if (cachedUrl && cachedUrl !== correctUrl) {
    console.log('🔧 [IMMEDIATE FIX] Clearing wrong cached URL:', cachedUrl);
    localStorage.removeItem('watchful_api_url');
    localStorage.setItem('watchful_api_url', correctUrl);
    console.log('✅ [IMMEDIATE FIX] Set correct URL:', correctUrl);
  } else if (!cachedUrl) {
    localStorage.setItem('watchful_api_url', correctUrl);
    console.log('✅ [IMMEDIATE FIX] Set initial URL:', correctUrl);
  }
})();

// Default configuration - update these values as needed
const WATCHFUL_CONFIG = {
  // API base URL - auto-detects Vercel or uses localhost
  // When deployed on Vercel, uses window.location.origin
  // For local development, uses localhost:3001
  API_BASE_URL: typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    ? window.location.origin
    : 'http://localhost:3001',
  
  // Patient ID - this should match a patient in your watchful system
  // You can set this dynamically or get it from user input
  PATIENT_ID: 'patient_demo', // Default patient ID
  
  // Caregiver ID - optional, can be set if needed
  CAREGIVER_ID: 'caregiver_demo',
  
  // Enable/disable API connection
  ENABLED: true
};

// Function to get the API base URL
// This can be customized to detect the watchful backend automatically
function getWatchfulApiUrl() {
  // Priority order:
  // 1. URL parameter (highest - for deployed app configuration)
  // 2. localStorage (user setting)
  // 3. Config default (fallback)
  
  // Check URL parameter first (for deployed app)
  if (apiUrlFromUrl) {
    return apiUrlFromUrl;
  }
  
  // Check localStorage
  const cachedUrl = localStorage.getItem('watchful_api_url');
  if (cachedUrl) {
    return cachedUrl;
  }
  
  // Fallback to config default
  return WATCHFUL_CONFIG.API_BASE_URL;
}

// Function to clear cached URL and use config default
function clearCachedApiUrl() {
  localStorage.removeItem('watchful_api_url');
  console.log('✅ Cleared cached API URL. Using default:', WATCHFUL_CONFIG.API_BASE_URL);
}

// Function to get patient ID
function getPatientId() {
  // Check if patient ID is set in localStorage
  const savedPatientId = localStorage.getItem('watchful_patient_id');
  if (savedPatientId) {
    return savedPatientId;
  }
  
  // Default to the configured patient ID
  return WATCHFUL_CONFIG.PATIENT_ID;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WATCHFUL_CONFIG, getWatchfulApiUrl, getPatientId };
}
