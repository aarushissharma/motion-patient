# 🕐 Fix Dashboard Timestamps - Show "X minutes ago"

## 🎯 Problem
Dashboard shows "fall detected just now" for all alerts instead of accurate timestamps like "5 minutes ago", "10 minutes ago", etc.

## ✅ Solution: Add Relative Time Display

The dashboard needs to calculate and display relative time from the alert timestamp.

---

## 🔧 Step 1: Find Dashboard File

**File:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**OR look for:**
- Files that display alerts
- Components that show alert timestamps
- Search for: "just now" or "timestamp" or "time"

---

## 🔧 Step 2: Add Relative Time Function

**Add this function to your dashboard code:**

```javascript
// Function to calculate relative time (e.g., "5 minutes ago")
function getRelativeTime(timestamp) {
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
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
}
```

---

## 🔧 Step 3: Update Alert Display

**Find where alerts are displayed and update the timestamp:**

**BEFORE (shows "just now" for everything):**
```javascript
<div>Fall detected just now</div>
```

**AFTER (shows accurate relative time):**
```javascript
<div>Fall detected {getRelativeTime(alert.timestamp)}</div>
```

**OR if using template:**
```javascript
`Fall detected ${getRelativeTime(alert.timestamp)}`
```

---

## 🔧 Step 4: Auto-Update Timestamps

**To make timestamps update automatically (e.g., "just now" → "1 minute ago" → "2 minutes ago"):**

**Add this to your dashboard update function:**

```javascript
// Update timestamps every minute
setInterval(() => {
  // Re-render alert timestamps
  updateAlertTimestamps();
}, 60000); // Every 60 seconds

function updateAlertTimestamps() {
  // Find all alert elements and update their timestamps
  const alertElements = document.querySelectorAll('[data-alert-timestamp]');
  alertElements.forEach(element => {
    const timestamp = element.getAttribute('data-alert-timestamp');
    const relativeTime = getRelativeTime(timestamp);
    element.textContent = `Fall detected ${relativeTime}`;
  });
}
```

---

## 🔧 Step 5: Update Alert Rendering

**When rendering alerts, add data attribute for timestamp:**

```javascript
function renderAlert(alert) {
  return `
    <div class="alert-item">
      <div>Fall detected <span data-alert-timestamp="${alert.timestamp}">${getRelativeTime(alert.timestamp)}</span></div>
      <div>Patient: ${alert.patient_id}</div>
      <div>Location: ${alert.location?.address || 'Unknown'}</div>
    </div>
  `;
}
```

---

## ✅ Complete Example

**Here's a complete example for your dashboard:**

```javascript
// Relative time function
function getRelativeTime(timestamp) {
  const now = new Date();
  const alertTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - alertTime) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
}

// Update timestamps every minute
setInterval(() => {
  updateAlertTimestamps();
}, 60000);

function updateAlertTimestamps() {
  document.querySelectorAll('[data-alert-timestamp]').forEach(element => {
    const timestamp = element.getAttribute('data-alert-timestamp');
    element.textContent = getRelativeTime(timestamp);
  });
}

// When rendering alerts
function renderAlerts(alerts) {
  return alerts.map(alert => `
    <div class="alert">
      <div>Fall detected <span data-alert-timestamp="${alert.timestamp}">${getRelativeTime(alert.timestamp)}</span></div>
      <div>Patient: ${alert.patient_id}</div>
    </div>
  `).join('');
}
```

---

## 🧪 Test It

1. **Make the changes** above
2. **Restart dashboard**
3. **Simulate a fall** - should show "just now"
4. **Wait 2 minutes** - should update to "2 minutes ago"
5. **Wait 5 minutes** - should update to "5 minutes ago"

---

## ✅ Expected Result

- **New fall (0-59 seconds):** "Fall detected just now"
- **1 minute later:** "Fall detected 1 minute ago"
- **5 minutes later:** "Fall detected 5 minutes ago"
- **1 hour later:** "Fall detected 1 hour ago"
- **Timestamps update automatically** every minute

---

## 📝 Summary

1. **Add `getRelativeTime()` function** to calculate relative time
2. **Use it when displaying alerts** instead of "just now"
3. **Add auto-update** to refresh timestamps every minute
4. **Test** - timestamps should update automatically!

That's it! Your dashboard will now show accurate timestamps! 🕐
