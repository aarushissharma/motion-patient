# 🔄 Real-Time Dashboard Connection Setup

## 🎯 Goal
Make the caregiver dashboard show fall alerts **immediately** when they're detected by the motion-patient app.

---

## ✅ Current Flow (Already Working!)

1. **Motion-Patient App** detects fall → Sends alert to backend
2. **Backend** receives alert → Stores it in database/demo mode
3. **Dashboard** polls backend → Shows alerts

**The connection is already working!** You just need to configure the dashboard for faster updates.

---

## ⚡ Make Dashboard Update Faster

The dashboard currently polls every **30 seconds**. To make it more real-time:

### Step 1: Find Dashboard Configuration File

**Location:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**OR if using a different structure:**
- Look for files like: `page.js`, `index.js`, `dashboard.js`, or similar
- Search for: `setInterval` or `fetchDashboardData`

---

### Step 2: Reduce Polling Interval

**Find this line:**
```javascript
const interval = setInterval(fetchDashboardData, 30000); // 30 seconds
```

**Change to:**
```javascript
const interval = setInterval(fetchDashboardData, 5000); // 5 seconds (more real-time)
```

**OR for even faster updates:**
```javascript
const interval = setInterval(fetchDashboardData, 2000); // 2 seconds (very fast)
```

---

### Step 3: Make Sure Dashboard Points to Correct Backend Port

**Check:** `/Users/riddhi/Documents/GitHub/watchful/config/api.js`

**Should be:**
```javascript
export const API_BASE_URL = 'http://localhost:5001';
```

**OR:**
```javascript
return `http://${window.location.hostname}:5001`;
```

**Important:** Must match the port your backend is running on (5001 in your case).

---

### Step 4: Restart Dashboard

After making changes:

1. **Stop the dashboard** (Ctrl+C in dashboard terminal)
2. **Restart it:**
   ```bash
   cd /Users/riddhi/Documents/GitHub/watchful
   npm run dev
   ```

---

## 🧪 Test the Complete Flow

### Test 1: Verify Motion-Patient Sends Alerts

1. **Open motion-patient app** in browser
2. **Open browser console** (F12)
3. **Enable motion tracking**
4. **Simulate a fall** (shake device or use console):
   ```javascript
   window.dispatchEvent(new DeviceMotionEvent('devicemotion', {
     accelerationIncludingGravity: { x: 0, y: 0, z: 30 }
   }));
   ```
5. **Check console** - Should see: `✅ Fall alert sent to watchful backend`

### Test 2: Verify Backend Receives Alert

1. **Check backend terminal**
2. **Should see:** `Demo mode: Alert created - fall for patient patient_demo`
3. **OR:** Alert saved to Firebase (if configured)

### Test 3: Verify Dashboard Shows Alert

1. **Open dashboard** in browser: `http://localhost:3000`
2. **Wait 5-10 seconds** (or refresh if using 30-second polling)
3. **Should see:**
   - New alert in "Active Alerts" section
   - Alert count increased
   - Alert details (time, patient, location)

---

## 📊 Expected Behavior

### When Fall is Detected:

**Motion-Patient App:**
- ✅ Shows fall in fall log
- ✅ Shows "✓ Sent to Dashboard" message
- ✅ Shows notification: "Fall alert sent to caregiver dashboard!"
- ✅ Console shows: `✅ Fall alert sent to watchful backend`

**Backend Terminal:**
- ✅ Shows: `Demo mode: Alert created - fall for patient patient_demo`
- ✅ Alert stored in system

**Dashboard (within 5-30 seconds depending on polling):**
- ✅ New alert appears in "Active Alerts"
- ✅ Alert count increases
- ✅ Alert shows patient name, time, location
- ✅ Status shows "active"

---

## 🔧 Troubleshooting

### Problem: Alerts not appearing in dashboard

**Check 1: Backend is receiving alerts**
- Check backend terminal for alert messages
- Test backend: `curl http://localhost:5001/api/alerts`

**Check 2: Dashboard is polling correctly**
- Open browser console (F12) on dashboard
- Look for network requests to `/api/caregivers/.../alerts`
- Should see requests every 5-30 seconds

**Check 3: Dashboard API configuration**
- Make sure dashboard points to port 5001 (not 5000)
- Check: `/Users/riddhi/Documents/GitHub/watchful/config/api.js`

**Check 4: Caregiver ID matches**
- Motion-patient uses: `caregiver_demo`
- Dashboard should fetch alerts for: `caregiver_demo`
- Check API endpoint: `/api/caregivers/caregiver_demo/alerts`

### Problem: Dashboard shows "Disconnected"

**Solution:**
1. Make sure backend is running (port 5001)
2. Check dashboard config points to port 5001
3. Refresh dashboard page (F5)

### Problem: Alerts appear but very slowly

**Solution:**
- Reduce polling interval (see Step 2 above)
- Change from 30 seconds to 5 seconds or less

---

## 🎯 Quick Configuration Summary

**Motion-Patient → Backend:**
- ✅ Already configured: `http://localhost:5001`
- ✅ Sends alerts automatically when fall detected

**Backend:**
- ✅ Running on port 5001
- ✅ Receives and stores alerts

**Dashboard → Backend:**
- ⚠️ **Needs configuration:**
  - Point to port 5001 (not 5000)
  - Reduce polling interval for faster updates

---

## 📝 Files to Edit

1. **Dashboard polling interval:**
   - File: `/Users/riddhi/Documents/GitHub/watchful/app/page.js`
   - Change: `setInterval(fetchDashboardData, 30000)` → `setInterval(fetchDashboardData, 5000)`

2. **Dashboard API URL:**
   - File: `/Users/riddhi/Documents/GitHub/watchful/config/api.js`
   - Ensure: `http://localhost:5001`

---

## ✅ Verification Checklist

- [ ] Motion-patient app sends alerts (check console)
- [ ] Backend receives alerts (check backend terminal)
- [ ] Dashboard API points to port 5001
- [ ] Dashboard polling interval is 5 seconds or less
- [ ] Dashboard shows new alerts within 5-10 seconds
- [ ] All three components running (motion-patient, backend, dashboard)

---

## 🚀 That's It!

Once configured, the complete flow works automatically:

1. **Fall detected** → Motion-patient app
2. **Alert sent** → Backend (port 5001)
3. **Alert stored** → Backend database
4. **Alert fetched** → Dashboard (every 5 seconds)
5. **Alert displayed** → Caregiver sees it!

**The real-time connection is working!** 🎉
