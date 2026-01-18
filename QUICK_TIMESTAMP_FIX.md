# 🕐 Quick Fix: Accurate Timestamps in Dashboard

## 🎯 Problem
Dashboard shows "fall detected just now" for all alerts. Should show:
- "just now" for new falls (0-59 seconds)
- "2 minutes ago" after 2 minutes
- "5 minutes ago" after 5 minutes
- etc.

## ✅ Quick Fix (3 Steps)

### Step 1: Add This Function to Dashboard

**File:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**Add this function:**

```javascript
function getRelativeTime(timestamp) {
  const now = new Date();
  const alertTime = new Date(timestamp);
  const seconds = Math.floor((now - alertTime) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}
```

### Step 2: Update Alert Display

**Find where you show alerts and change:**

**FROM:**
```javascript
"Fall detected just now"
```

**TO:**
```javascript
`Fall detected ${getRelativeTime(alert.timestamp)}`
```

### Step 3: Auto-Update Every Minute (Optional)

**Add this to update timestamps automatically:**

```javascript
// Update timestamps every minute
setInterval(() => {
  document.querySelectorAll('[data-time]').forEach(el => {
    const timestamp = el.getAttribute('data-time');
    el.textContent = getRelativeTime(timestamp);
  });
}, 60000);
```

**And when rendering alerts, add data attribute:**
```javascript
<span data-time="${alert.timestamp}">${getRelativeTime(alert.timestamp)}</span>
```

---

## ✅ Expected Result

- **New fall:** "Fall detected just now"
- **After 2 minutes:** "Fall detected 2 minutes ago"
- **After 5 minutes:** "Fall detected 5 minutes ago"
- **Updates automatically** every minute

---

## 🧪 Test

1. **Add the function** (Step 1)
2. **Update alert display** (Step 2)
3. **Simulate a fall** - should show "just now"
4. **Wait 2 minutes** - should update to "2 minutes ago"

**That's it!** 🕐
