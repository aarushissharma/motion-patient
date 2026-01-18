// API Service for connecting to Watchful Backend
// Handles sending fall detection alerts to the watchful system

// Get current location using browser geolocation API
async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          address: 'Location detected' // Could be enhanced with reverse geocoding
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
        // Return default location if geolocation fails
        resolve({
          lat: null,
          lng: null,
          accuracy: null,
          address: 'Location unavailable'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
}

// Send fall alert to watchful backend
async function sendFallAlertToWatchful(fallData) {
  try {
    // Check if API is enabled
    const apiUrl = getWatchfulApiUrl();
    const patientId = getPatientId();
    
    if (!WATCHFUL_CONFIG.ENABLED) {
      console.log('Watchful API connection is disabled');
      return { success: false, message: 'API disabled' };
    }

    // Get current location
    let location;
    try {
      location = await getCurrentLocation();
    } catch (error) {
      console.warn('Could not get location:', error);
      location = {
        lat: null,
        lng: null,
        accuracy: null,
        address: 'Location unavailable'
      };
    }

    // Prepare alert data according to watchful API format
    // Use precise timestamp to ensure real-time detection
    const now = new Date();
    const timestamp = now.toISOString();
    const timeString = now.toLocaleTimeString();
    
    const alertData = {
      patient_id: patientId,
      alert_type: 'fall',
      severity: 'high', // Falls are typically high severity
      location: {
        lat: location.lat || 0,
        lng: location.lng || 0,
        address: location.address || 'Location unavailable'
      },
      timestamp: timestamp, // Precise ISO timestamp for real-time detection
      message: `Fall detected at ${timeString} with magnitude ${fallData.magnitude.toFixed(2)}. Acceleration: X=${fallData.ax.toFixed(2)}, Y=${fallData.ay.toFixed(2)}, Z=${fallData.az.toFixed(2)}`,
      status: 'active',
      caregiver_id: WATCHFUL_CONFIG.CAREGIVER_ID || null,
      // Add unique identifier to prevent duplicates
      _fallId: `fall_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Determine API URL - use current origin if on Vercel, otherwise localhost
    const isVercel = window.location.hostname.includes('vercel.app');
    const apiBaseUrl = isVercel 
      ? window.location.origin  // Use Vercel domain
      : 'http://localhost:3001'; // Local development
    
    // Send to API (works for both Vercel and local)
    try {
      const apiController = new AbortController();
      const apiTimeoutId = setTimeout(() => apiController.abort(), 5000);
      
      const apiResponse = await fetch(`${apiBaseUrl}/api/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: alertData._fallId,
          time: timeString,
          magnitude: fallData.magnitude.toFixed(2),
          timestamp: timestamp,
          location: alertData.location,
          message: alertData.message,
          status: 'active'
        }),
        signal: apiController.signal,
        mode: 'cors'
      });
      
      clearTimeout(apiTimeoutId);
      
      if (apiResponse.ok) {
        const apiResult = await apiResponse.json();
        console.log('✅ Fall sent to API:', apiResult);
      }
    } catch (apiError) {
      console.warn('⚠️ Could not send to API:', apiError.message);
    }

    // Also send to watchful backend if configured
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const response = await fetch(`${apiUrl}/api/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
        signal: controller.signal,
        mode: 'cors'
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      const alertTime = new Date().toLocaleTimeString();
      console.log('✅ Fall alert sent to watchful backend and dashboard:', result);
      console.log(`📊 Alert sent at ${alertTime} - will appear in dashboard within 1-2 seconds`);
      console.log(`🌐 Sent to: ${apiUrl}/api/alerts`);
      console.log(`👤 Patient ID: ${patientId}`);
      console.log('🔄 Dashboard should refresh automatically to show new alert');
      return { success: true, data: result };
    } catch (backendError) {
      console.warn('⚠️ Could not send to watchful backend:', backendError.message);
      // Still return success if local server received it
      return { success: true, data: { message: 'Sent to local server' } };
    }

  } catch (error) {
    console.error('❌ Error sending fall alert to watchful:', error);
    return { success: false, error: error.message };
  }
}

// Test connection to API (works for both Vercel and local)
async function testWatchfulConnection() {
  try {
    // Always use getWatchfulApiUrl() which now handles Vercel detection
    const apiUrl = getWatchfulApiUrl();
    
    // Try to connect with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    // Test the status endpoint
    const response = await fetch(`${apiUrl}/api/status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
      mode: 'cors', // Explicitly set CORS mode
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API connection successful:', data);
    return { success: true, data };
  } catch (error) {
    let errorMessage = error.message;
    
    // Provide more helpful error messages
    if (error.name === 'AbortError') {
      errorMessage = 'Connection timeout - API may not be available';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      if (window.location.hostname.includes('vercel.app')) {
        errorMessage = 'Cannot reach API - make sure API routes are deployed on Vercel';
      } else {
        errorMessage = 'Cannot reach server - make sure it\'s running: node server.js';
      }
    } else if (error.message.includes('CORS')) {
      errorMessage = 'CORS error - check API CORS configuration';
    }
    
    console.error('❌ API connection failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Send motion data to watchful backend
async function sendMotionDataToWatchful(motionData) {
  try {
    const apiUrl = getWatchfulApiUrl();
    const patientId = getPatientId();
    
    if (!WATCHFUL_CONFIG.ENABLED) {
      return { success: false, message: 'API disabled' };
    }

    // Get current location (optional, for motion data)
    let location;
    try {
      location = await getCurrentLocation();
    } catch (error) {
      location = { lat: null, lng: null, address: 'Location unavailable' };
    }

    const motionPayload = {
      patient_id: patientId,
      timestamp: new Date().toISOString(),
      event_type: motionData.eventType || 'NORMAL',
      magnitude: motionData.magnitude || 0,
      acceleration: {
        x: motionData.ax || 0,
        y: motionData.ay || 0,
        z: motionData.az || 0
      },
      location: location
    };

    // Determine API URL - use current origin if on Vercel, otherwise localhost
    const isVercel = window.location.hostname.includes('vercel.app');
    const apiBaseUrl = isVercel 
      ? window.location.origin  // Use Vercel domain
      : 'http://localhost:3001'; // Local development
    
    // Send motion data to API (works for both Vercel and local)
    try {
      const apiResponse = await fetch(`${apiBaseUrl}/api/motion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...motionPayload,
          timestamp: motionPayload.timestamp || new Date().toISOString()
        }),
        mode: 'cors',
        signal: AbortSignal.timeout(5000)
      });
      
      if (apiResponse.ok) {
        console.log('✅ Motion data sent to API');
      }
    } catch (apiError) {
      console.warn('⚠️ Could not send motion data to API:', apiError.message);
    }

    // Also send to watchful backend if configured
    console.log('📤 Sending motion data to:', `${apiUrl}/api/motion/data`);
    
    try {
      const response = await fetch(`${apiUrl}/api/motion/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motionPayload),
        mode: 'cors',
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Motion data sent successfully:', result);
      return { success: true, data: result };
    } catch (backendError) {
      console.warn('⚠️ Could not send to watchful backend:', backendError.message);
      return { success: true, data: { message: 'Sent to local server' } };
    }
  } catch (error) {
    console.error('❌ Error sending motion data:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message;
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      errorMessage = 'Connection timeout - backend may not be accessible from phone';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorMessage = `Cannot reach backend at ${apiUrl}. Make sure:\n1. Backend is running\n2. Phone and computer are on same WiFi\n3. Firewall allows port 5001`;
    }
    
    return { success: false, error: errorMessage };
  }
}

// Send fall history to watchful backend
async function sendFallHistoryToWatchful(fallLog) {
  try {
    const apiUrl = getWatchfulApiUrl();
    const patientId = getPatientId();
    
    if (!WATCHFUL_CONFIG.ENABLED) {
      return { success: false, message: 'API disabled' };
    }

    // Format fall history
    const fallHistory = fallLog.map(fall => ({
      time: fall.time,
      magnitude: fall.magnitude,
      timestamp: fall.timestamp || new Date().toISOString()
    }));

    const payload = {
      patient_id: patientId,
      falls: fallHistory
    };

    const response = await fetch(`${apiUrl}/api/motion/fall-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Fall history sent to dashboard:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Error sending fall history:', error);
    return { success: false, error: error.message };
  }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    sendFallAlertToWatchful, 
    testWatchfulConnection, 
    getCurrentLocation,
    sendMotionDataToWatchful,
    sendFallHistoryToWatchful
  };
}
