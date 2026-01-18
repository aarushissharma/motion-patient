const fallLog = [];
const logEl = document.getElementById("fallLog");
let motionDataInterval = null;
let lastMotionDataSent = null;
const testConnectionBtn = document.getElementById("testConnectionBtn");

console.log("main.js loaded");

const debugEl = document.getElementById("debug");
const statusEl = document.getElementById("status");

// Connection status UI elements
const connectionStatusEl = document.getElementById("connectionStatus");
const connectionIconEl = document.getElementById("connectionIcon");
const connectionMessageEl = document.getElementById("connectionMessage");
const lastUpdateEl = document.getElementById("lastUpdate");
const apiUrlValueEl = document.getElementById("apiUrlValue");
const refreshBtn = document.getElementById("refreshBtn");

let connectionCheckInterval = null;

// Show alert notification
function showAlertNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
  `;
  
  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Add CSS animations if not already in styles
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Update connection status in UI
function updateConnectionStatus(success, error = null) {
  if (!connectionStatusEl || !connectionIconEl || !connectionMessageEl || !lastUpdateEl || !apiUrlValueEl) {
    console.warn('Connection status UI elements not found');
    return;
  }
  
  // Get the actual API URL being used (from config/localStorage/URL param)
  const apiUrl = getWatchfulApiUrl();
  apiUrlValueEl.textContent = apiUrl;
  console.log('🔧 [UI UPDATE] Using API URL:', apiUrl);
  
  if (success) {
    connectionStatusEl.className = "connection-status connected";
    connectionIconEl.textContent = "✅";
    connectionMessageEl.textContent = "Connected";
    lastUpdateEl.textContent = `Last update: ${new Date().toLocaleTimeString()}`;
    console.log('✅ Connected to watchful backend at:', apiUrl);
  } else {
    connectionStatusEl.className = "connection-status disconnected";
    connectionIconEl.textContent = "❌";
    connectionMessageEl.textContent = "Disconnected";
    const errorMsg = error || `Cannot reach backend at ${apiUrl} - make sure it's running`;
    lastUpdateEl.textContent = errorMsg;
    console.warn('⚠️ Could not connect to watchful backend at:', apiUrl);
    console.warn('⚠️ Error:', errorMsg);
    console.warn('⚠️ Fall alerts will not be sent. Make sure watchful backend is running.');
  }
}

// Check connection status
async function checkConnection() {
  console.log('Testing watchful backend connection...');
  
  // Show checking state
  if (connectionStatusEl && connectionIconEl && connectionMessageEl) {
    connectionStatusEl.className = "connection-status";
    connectionIconEl.textContent = "⏳";
    connectionMessageEl.textContent = "Checking connection...";
  }
  
  const connectionTest = await testWatchfulConnection();
  updateConnectionStatus(connectionTest.success, connectionTest.error);
  return connectionTest;
}

// Test complete flow: motion → backend → dashboard
async function testCompleteFlow() {
  console.log('🧪 Testing complete flow: Motion → Backend → Dashboard...');
  
  // Test 1: Check backend connection
  const connectionTest = await testWatchfulConnection();
  if (!connectionTest.success) {
    console.error('❌ Backend not connected. Cannot test flow.');
    showAlertNotification('Backend not connected. Start backend first.', 'error');
    return false;
  }
  
  console.log('✅ Step 1: Backend connection verified');
  
  // Test 2: Send a test alert
  console.log('📤 Step 2: Sending test alert to backend...');
  const testFallData = {
    ax: 0,
    ay: 0,
    az: 30,
    magnitude: 30
  };
  
  const alertResult = await sendFallAlertToWatchful(testFallData);
  if (alertResult.success) {
    console.log('✅ Step 2: Test alert sent successfully');
    console.log('📊 Step 3: Alert should appear in dashboard within 5-30 seconds');
    showAlertNotification('Test alert sent! Check dashboard in a few seconds.', 'success');
    return true;
  } else {
    console.error('❌ Step 2: Failed to send test alert:', alertResult.error);
    showAlertNotification('Failed to send test alert. Check backend.', 'error');
    return false;
  }
}

// Force fix port on page load - run immediately, before DOMContentLoaded
(function fixPortOnLoad() {
  // AGGRESSIVELY clear and set correct port
  const correctUrl = 'http://localhost:5001';
  const cachedUrl = localStorage.getItem('watchful_api_url');
  
  if (cachedUrl !== correctUrl) {
    console.log('🔧 [IMMEDIATE FIX] Fixing port on page load');
    console.log('   Old (wrong):', cachedUrl);
    console.log('   New (correct):', correctUrl);
    localStorage.setItem('watchful_api_url', correctUrl);
    console.log('✅ [IMMEDIATE FIX] Port fixed to:', correctUrl);
  } else {
    console.log('✅ [IMMEDIATE FIX] Port already correct:', correctUrl);
  }
  
  // Also update the UI element immediately if it exists
  if (document.getElementById('apiUrlValue')) {
    document.getElementById('apiUrlValue').textContent = correctUrl;
  }
})();

// Test watchful connection on load
window.addEventListener('DOMContentLoaded', async () => {
  // Get the API URL (from URL param, localStorage, or default)
  const apiUrl = getWatchfulApiUrl();
  
  // Update UI immediately with the actual API URL being used
  if (apiUrlValueEl) {
    apiUrlValueEl.textContent = apiUrl;
  }
  
  console.log('✅ [DOM LOADED] Using API URL:', apiUrl);
  console.log('✅ [DOM LOADED] Starting connection check...');
  
  // Initial connection check
  await checkConnection();
  
  // Set up refresh button
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = "Refreshing...";
      await checkConnection();
      refreshBtn.disabled = false;
      refreshBtn.textContent = "Refresh";
    });
  }
  
  // Periodic connection check every 10 seconds for better real-time feedback
  connectionCheckInterval = setInterval(checkConnection, 10000);
  
  // Send fall history to dashboard periodically (every 30 seconds)
  setInterval(() => {
    if (fallLog.length > 0) {
      sendFallHistoryToWatchful(fallLog).then(result => {
        if (result.success) {
          console.log('📊 Fall history synced to dashboard');
        }
      });
    }
  }, 30000);
  
  // Make test function available globally for console testing
  window.testCompleteFlow = testCompleteFlow;
  window.clearCachedApiUrl = clearCachedApiUrl; // Also expose clear function
  console.log('💡 Tip: Run testCompleteFlow() in console to test the complete flow');
  console.log('💡 Tip: Run clearCachedApiUrl() to reset API URL to default');
  
  // Set up test connection button (works without motion permission)
  if (testConnectionBtn) {
    testConnectionBtn.style.display = "block";
    testConnectionBtn.addEventListener('click', async () => {
      testConnectionBtn.disabled = true;
      testConnectionBtn.textContent = "Testing...";
      
      // Send test motion data without needing motion permission
      const testData = {
        eventType: "NORMAL",
        magnitude: 9.8, // Normal gravity
        ax: 0,
        ay: 0,
        az: 9.8
      };
      
      console.log('🧪 Sending test motion data...');
      const result = await sendMotionDataToWatchful(testData);
      
      if (result.success) {
        testConnectionBtn.textContent = "✅ Test Sent! Check Dashboard";
        testConnectionBtn.style.backgroundColor = "#10b981";
        console.log('✅ Test motion data sent successfully!');
        console.log('📊 Check dashboard at http://localhost:3000');
        
        // Also send a test fall history
        const testFalls = [{
          time: new Date().toLocaleTimeString(),
          magnitude: "25.5",
          timestamp: new Date().toISOString()
        }];
        await sendFallHistoryToWatchful(testFalls);
        
        setTimeout(() => {
          testConnectionBtn.textContent = "Test Connection (No Motion Needed)";
          testConnectionBtn.style.backgroundColor = "#3b82f6";
          testConnectionBtn.disabled = false;
        }, 5000);
      } else {
        const apiUrl = getWatchfulApiUrl();
        testConnectionBtn.textContent = "❌ Test Failed";
        testConnectionBtn.style.backgroundColor = "#ef4444";
        console.error('❌ Test failed:', result.error);
        
        // Show detailed error message
        const errorMsg = result.error || 'Unknown error';
        alert(`Test Failed!\n\n${errorMsg}\n\nTrying to connect to: ${apiUrl}\n\nTo fix:\n1. Make sure backend is running: python3 app.py\n2. Test backend directly: Open http://169.233.235.205:5001 on your phone\n3. Check firewall settings\n4. Make sure phone and computer are on same WiFi`);
        
        setTimeout(() => {
          testConnectionBtn.textContent = "Test Connection (No Motion Needed)";
          testConnectionBtn.style.backgroundColor = "#3b82f6";
          testConnectionBtn.disabled = false;
        }, 5000);
      }
    });
  }
});

startMotionTracking((data) => {
  debugEl.innerText = `
X: ${data.ax.toFixed(2)}
Y: ${data.ay.toFixed(2)}
Z: ${data.az.toFixed(2)}

Magnitude: ${data.magnitude.toFixed(2)}
Event: ${data.eventType}
  `;

  statusEl.innerText = "Status: " + data.eventType;

  if (data.eventType === "FALL") {
    statusEl.style.color = "red";
  } else if (data.eventType === "SLOW DESCENT") {
    statusEl.style.color = "orange";
  } else {
    statusEl.style.color = "green";
  }

  // Send motion data to dashboard (for all event types)
  // Throttle to send every 5 seconds to avoid too many requests
  const now = Date.now();
  if (!lastMotionDataSent || (now - lastMotionDataSent) > 5000) {
    sendMotionDataToWatchful(data).then(result => {
      if (result.success) {
        console.log('📊 Motion data sent to dashboard:', data.eventType);
      }
    });
    lastMotionDataSent = now;
  }

  if (data.eventType === "FALL") {
    const now = new Date();
    const fallEntry = {
      time: now.toLocaleTimeString(),
      magnitude: data.magnitude.toFixed(2),
      timestamp: now.toISOString()
    };
    fallLog.push(fallEntry);

    // Keep only last 5 events for UI
    const recentFalls = fallLog.slice(-5);

    logEl.innerHTML = recentFalls
      .map(
        (f) =>
          `<div>⚠️ Fall at ${f.time} (mag ${f.magnitude})</div>`
      )
      .join("");

    // Send fall alert to watchful backend (which will notify dashboard)
    console.log('🚨 Fall detected! Sending alert to backend and dashboard...');
    sendFallAlertToWatchful(data).then(result => {
      if (result.success) {
        console.log('✅ Fall alert sent to watchful backend');
        console.log('📊 Alert will appear in caregiver dashboard shortly');
        
        // Get fall alert ID for voice assistant
        const fallAlertId = result.data?.id || result.data?._fallId || Date.now().toString();
        
        // Activate voice assistant
        if (typeof activateVoiceOnFall === 'function') {
          console.log('🎤 Activating voice assistant...');
          activateVoiceOnFall(fallAlertId);
        }
        
        // Update UI to show alert was sent
        const lastFallDiv = logEl.querySelector('div:last-child');
        if (lastFallDiv) {
          lastFallDiv.innerHTML += ' <span style="color: #10b981; font-weight: bold;">✓ Sent to Dashboard</span>';
        }
        
        // Show notification that alert was sent
        showAlertNotification('Fall alert sent to caregiver dashboard!', 'success');
      } else {
        console.error('❌ Failed to send fall alert:', result.error);
        // Update UI to show alert failed
        const lastFallDiv = logEl.querySelector('div:last-child');
        if (lastFallDiv) {
          lastFallDiv.innerHTML += ' <span style="color: #ef4444; font-weight: bold;">✗ Failed</span>';
        }
        
        // Show error notification
        showAlertNotification('Failed to send alert. Check backend connection.', 'error');
      }
    });
    
    // Send updated fall history to dashboard
    sendFallHistoryToWatchful(fallLog).then(result => {
      if (result.success) {
        console.log('✅ Fall history sent to dashboard');
      }
    });
  }
});
