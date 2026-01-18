// ============================================
// COPY THIS CODE INTO YOUR DASHBOARD FILE
// File: /Users/riddhi/Documents/GitHub/watchful/app/page.js
// ============================================

// Function to calculate relative time (e.g., "5 minutes ago")
function getRelativeTime(timestamp) {
  if (!timestamp) return 'unknown time';
  
  const now = new Date();
  const alertTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - alertTime) / 1000);
  
  // Less than 1 minute = "just now"
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  // Less than 1 hour = "X minutes ago"
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  // Less than 1 day = "X hours ago"
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  // Days ago
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  // Weeks ago
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
}

// Auto-update timestamps every minute
let timestampUpdateInterval = null;

function startTimestampUpdates() {
  // Clear existing interval if any
  if (timestampUpdateInterval) {
    clearInterval(timestampUpdateInterval);
  }
  
  // Update timestamps every 60 seconds
  timestampUpdateInterval = setInterval(() => {
    updateAllAlertTimestamps();
  }, 60000); // Every minute
}

function updateAllAlertTimestamps() {
  // Find all elements with alert timestamps
  const timestampElements = document.querySelectorAll('[data-alert-timestamp]');
  
  timestampElements.forEach(element => {
    const timestamp = element.getAttribute('data-alert-timestamp');
    if (timestamp) {
      const relativeTime = getRelativeTime(timestamp);
      element.textContent = relativeTime;
    }
  });
  
  console.log(`🕐 Updated ${timestampElements.length} alert timestamps`);
}

// ============================================
// UPDATE YOUR ALERT RENDERING FUNCTION
// ============================================

// BEFORE (shows "just now" for everything):
// function renderAlert(alert) {
//   return `<div>Fall detected just now</div>`;
// }

// AFTER (shows accurate relative time):
function renderAlert(alert) {
  const relativeTime = getRelativeTime(alert.timestamp);
  return `
    <div class="alert-item">
      <div>
        Fall detected 
        <span data-alert-timestamp="${alert.timestamp}" class="alert-time">
          ${relativeTime}
        </span>
      </div>
      <div>Patient: ${alert.patient_id || 'Unknown'}</div>
      <div>Time: ${new Date(alert.timestamp).toLocaleString()}</div>
      ${alert.location?.address ? `<div>Location: ${alert.location.address}</div>` : ''}
    </div>
  `;
}

// ============================================
// CALL THIS WHEN DASHBOARD LOADS
// ============================================

// Add to your dashboard initialization:
// startTimestampUpdates();

// ============================================
// EXAMPLE: UPDATE EXISTING ALERT DISPLAY
// ============================================

// If you have existing alert display code, update it like this:

// OLD:
// alerts.forEach(alert => {
//   alertDiv.innerHTML += `<div>Fall detected just now</div>`;
// });

// NEW:
// alerts.forEach(alert => {
//   const relativeTime = getRelativeTime(alert.timestamp);
//   alertDiv.innerHTML += `
//     <div>
//       Fall detected 
//       <span data-alert-timestamp="${alert.timestamp}">${relativeTime}</span>
//     </div>
//   `;
// });
// 
// // Start auto-updates
// startTimestampUpdates();

// ============================================
// STYLING (Optional - add to your CSS)
// ============================================

/*
.alert-time {
  font-weight: 600;
  color: #6366f1;
}

.alert-item {
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}
*/
