// Quick Fix Script for Dashboard Real-Time Updates
// Copy this code into your dashboard's page.js or main component file

// ============================================
// REPLACE THE EXISTING setInterval LINE WITH:
// ============================================

// OLD (slow - 30 seconds):
// const interval = setInterval(fetchDashboardData, 30000);

// NEW (real-time - 2 seconds):
const interval = setInterval(fetchDashboardData, 2000);

// ============================================
// ADD THIS FUNCTION TO SHOW NEW ALERTS:
// ============================================

let lastAlertCount = 0;
let lastAlertTimestamp = null;

async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/caregivers/${caregiverId}/alerts`);
    const data = await response.json();
    
    const currentAlertCount = data.alerts ? data.alerts.length : 0;
    
    // Check if there's a new alert
    if (currentAlertCount > lastAlertCount && data.alerts && data.alerts.length > 0) {
      const latestAlert = data.alerts[0];
      const alertTime = new Date(latestAlert.timestamp);
      
      // Only show notification if this is a truly new alert
      if (!lastAlertTimestamp || alertTime > lastAlertTimestamp) {
        lastAlertTimestamp = alertTime;
        
        // Show notification
        showNewAlertNotification(latestAlert);
        
        // Force UI update
        updateDashboard(data);
      }
    }
    
    lastAlertCount = currentAlertCount;
    
    // Update dashboard even if no new alerts (for status updates)
    updateDashboard(data);
    
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
}

// ============================================
// ADD THIS NOTIFICATION FUNCTION:
// ============================================

function showNewAlertNotification(alert) {
  // Remove any existing notification
  const existing = document.getElementById('new-alert-notification');
  if (existing) {
    existing.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.id = 'new-alert-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    padding: 20px 25px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  `;
  
  const alertTime = new Date(alert.timestamp).toLocaleTimeString();
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
      <span style="font-size: 24px;">🚨</span>
      <strong style="font-size: 16px;">New Fall Alert!</strong>
    </div>
    <div style="font-size: 14px; opacity: 0.95;">
      <div><strong>Patient:</strong> ${alert.patient_id || 'Unknown'}</div>
      <div><strong>Time:</strong> ${alertTime}</div>
      <div><strong>Location:</strong> ${alert.location?.address || 'Unknown'}</div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// ============================================
// ADD THESE CSS ANIMATIONS (if not already present):
// ============================================

if (!document.getElementById('alert-notification-styles')) {
  const style = document.createElement('style');
  style.id = 'alert-notification-styles';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
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
