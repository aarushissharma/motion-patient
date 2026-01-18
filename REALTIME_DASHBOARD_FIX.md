# ⚡ Make Dashboard Real-Time

## 🎯 Problem
Dashboard shows old alerts like "fall detected at home just now" instead of real-time updates.

## ✅ Solution: Update Dashboard Polling

The dashboard needs to poll the backend **much more frequently** to show real-time alerts.

---

## 🔧 Step 1: Find Dashboard File

**Location:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**OR if using different structure:**
- Look for: `page.js`, `index.js`, `dashboard.js`, `App.js`, or similar
- Search for: `setInterval` or `fetchDashboardData` or `useEffect`

---

## 🔧 Step 2: Update Polling Interval

### Find This Code:
```javascript
// Current (slow - 30 seconds)
const interval = setInterval(fetchDashboardData, 30000);
```

### Change To (Real-Time - 2 seconds):
```javascript
// Real-time (2 seconds)
const interval = setInterval(fetchDashboardData, 2000);
```

### OR For Even Faster (1 second):
```javascript
// Very fast (1 second)
const interval = setInterval(fetchDashboardData, 1000);
```

---

## 🔧 Step 3: Add Timestamp Checking

To avoid showing duplicate alerts, add timestamp checking:

```javascript
let lastAlertTimestamp = null;

async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/caregivers/${caregiverId}/alerts`);
    const data = await response.json();
    
    // Check for new alerts
    if (data.alerts && data.alerts.length > 0) {
      const latestAlert = data.alerts[0];
      const alertTime = new Date(latestAlert.timestamp);
      
      // Only update if this is a new alert
      if (!lastAlertTimestamp || alertTime > lastAlertTimestamp) {
        lastAlertTimestamp = alertTime;
        // Update UI with new alert
        updateDashboard(data);
        
        // Show notification for new alert
        if (lastAlertTimestamp) {
          showNewAlertNotification(latestAlert);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
}
```

---

## 🔧 Step 4: Add Visual Notification for New Alerts

Add a notification when a new alert arrives:

```javascript
function showNewAlertNotification(alert) {
  // Create notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  notification.innerHTML = `
    <strong>🚨 New Fall Alert!</strong><br>
    Patient: ${alert.patient_id}<br>
    Time: ${new Date(alert.timestamp).toLocaleTimeString()}
  `;
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}
```

---

## 🔧 Step 5: Restart Dashboard

After making changes:

1. **Stop dashboard** (Ctrl+C in dashboard terminal)
2. **Restart:**
   ```bash
   cd /Users/riddhi/Documents/GitHub/watchful
   npm run dev
   ```

---

## ✅ Expected Result

After updating:
- ✅ Dashboard polls every 1-2 seconds
- ✅ New alerts appear within 1-2 seconds
- ✅ Visual notification shows when new alert arrives
- ✅ No duplicate alerts shown

---

## 🧪 Test Real-Time Connection

1. **Open motion-patient app**
2. **Simulate a fall** (shake device or use console)
3. **Watch dashboard** - should show new alert within 1-2 seconds
4. **See notification** - "🚨 New Fall Alert!" appears

---

## 🎯 Quick Configuration Summary

**File to Edit:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**Change:**
```javascript
// FROM (slow):
setInterval(fetchDashboardData, 30000); // 30 seconds

// TO (real-time):
setInterval(fetchDashboardData, 2000); // 2 seconds
```

**That's it!** The dashboard will now update in real-time! 🚀
