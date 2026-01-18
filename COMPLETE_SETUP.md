# 🚀 Complete Setup Guide: Device → Backend → Caregiver Dashboard

## 🎯 The Complete Flow

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Patient Device │         │  Watchful       │         │  Caregiver     │
│  (motion-patient)│        │  Backend        │         │  Dashboard      │
│                 │         │  (FastAPI)      │         │  (Next.js)      │
│  Detects Fall   │────────►│  Receives Alert │────────►│  Shows Alert    │
│  Sends Alert    │  HTTP   │  Saves to DB   │  HTTP   │  Notifies       │
│                 │  POST   │  Returns OK    │  GET    │  Caregiver      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

---

## 📋 Step-by-Step Setup

### Step 1: Start Watchful Backend Server

**Open Terminal 1:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python app.py
```

**OR if you use uvicorn:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
uvicorn app:app --reload --port 5000
```

**✅ Verify it's running:**
- Open browser: `http://localhost:5000`
- Should see: `{"message": "Caregiver Alert System API", "status": "running"}`

**Keep this terminal open!** The backend must stay running.

---

### Step 2: Update Watchful Dashboard API Configuration

The dashboard needs to point to the correct backend port.

**Edit:** `/Users/riddhi/Documents/GitHub/watchful/config/api.js`

**Change this:**
```javascript
return `http://${window.location.hostname}:3003`;
```

**To this:**
```javascript
return `http://${window.location.hostname}:5000`;
```

**OR manually set:**
```javascript
export const API_BASE_URL = 'http://localhost:5000';
```

---

### Step 3: Start Watchful Dashboard (Frontend)

**Open Terminal 2:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```

**OR if using Next.js:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm start
```

**✅ Verify it's running:**
- Open browser: `http://localhost:3000` (or whatever port Next.js uses)
- Should see the Caregiver Dashboard

**Keep this terminal open too!**

---

### Step 4: Configure Motion-Patient App

**Edit:** `/Users/riddhi/Downloads/motion-patient-main/js/config.js`

**Make sure these settings are correct:**
```javascript
const WATCHFUL_CONFIG = {
  API_BASE_URL: 'http://localhost:5000',  // ← Must match backend port
  PATIENT_ID: 'patient_demo',              // ← Must exist in watchful
  CAREGIVER_ID: 'caregiver_demo',          // ← Must exist in watchful
  ENABLED: true
};
```

**Important:** 
- If device is on a **different computer/phone**, change `localhost` to your computer's IP address
- Example: `API_BASE_URL: 'http://192.168.1.100:5000'`

---

### Step 5: Open Motion-Patient App on Device

**On the patient's device (phone/tablet):**

1. **Open the app:**
   - Navigate to: `/Users/riddhi/Downloads/motion-patient-main/index.html`
   - Or serve it via a web server

2. **Check connection:**
   - Open browser console (F12 or developer tools)
   - Should see: `✅ Connected to watchful backend`

3. **Enable motion:**
   - Click "Enable Motion" button
   - Grant permissions when asked

---

### Step 6: Test the Complete Flow

**Test Scenario:**

1. **On Patient Device:**
   - Shake device hard (simulate fall)
   - OR use browser console to simulate:
     ```javascript
     window.dispatchEvent(new DeviceMotionEvent('devicemotion', {
       accelerationIncludingGravity: { x: 0, y: 0, z: 30 }
     }))
     ```

2. **Check Patient Device Console:**
   - Should see: `✅ Fall alert sent to watchful backend`
   - Fall log should show: `⚠️ Fall at [time] (mag [value]) ✓ Sent`

3. **Check Watchful Backend Terminal:**
   - Should see: `Demo mode: Alert created - fall for patient patient_demo`
   - OR: Alert saved to Firebase

4. **Check Caregiver Dashboard:**
   - Wait 30 seconds (dashboard refreshes every 30 seconds)
   - OR click "Refresh" button
   - Should see new alert appear in:
     - "Active Alerts" section
     - "Recent Alerts" section
     - Alert count should increase

---

## 🔧 Configuration Details

### Port Configuration

| Component | Default Port | Config File |
|-----------|-------------|-------------|
| Watchful Backend | 5000 | `app.py` (line 1861) |
| Watchful Dashboard | 3000 | Next.js default |
| Motion-Patient | Any (static HTML) | N/A |

### API Endpoints Used

**Motion-Patient → Backend:**
- `POST http://localhost:5000/api/alerts` - Sends fall alert

**Dashboard → Backend:**
- `GET http://localhost:5000/api/caregivers/{caregiverId}/alerts` - Gets alerts
- `GET http://localhost:5000/api/patients` - Gets patients
- `PUT http://localhost:5000/api/alerts/{alertId}` - Updates alert status

---

## 🌐 Network Configuration (For Different Devices)

### If Patient Device is on Same Computer

**Use:**
```javascript
API_BASE_URL: 'http://localhost:5000'
```

### If Patient Device is on Different Computer/Phone

**Step 1: Find your computer's IP address:**

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

**Example IP:** `192.168.1.100`

**Step 2: Update motion-patient config:**
```javascript
API_BASE_URL: 'http://192.168.1.100:5000'
```

**Step 3: Make sure backend allows external connections:**
- Backend should already be configured with `host="0.0.0.0"` (it is in app.py)
- Make sure firewall allows port 5000

**Step 4: Update watchful dashboard config (if accessing from different computer):**
```javascript
export const API_BASE_URL = 'http://192.168.1.100:5000';
```

---

## ✅ Verification Checklist

### Backend Running:
- [ ] Terminal shows: `Uvicorn running on http://0.0.0.0:5000`
- [ ] Browser `http://localhost:5000` shows JSON response
- [ ] No error messages in terminal

### Dashboard Running:
- [ ] Terminal shows Next.js server running
- [ ] Browser shows Caregiver Dashboard
- [ ] Dashboard loads without errors
- [ ] Can see patient list (even if empty)

### Motion-Patient App:
- [ ] Console shows: `✅ Connected to watchful backend`
- [ ] "Enable Motion" button works
- [ ] Motion data appears in debug area
- [ ] No CORS errors in console

### End-to-End Test:
- [ ] Fall detected on device
- [ ] Console shows: `✅ Fall alert sent`
- [ ] Backend terminal shows alert received
- [ ] Dashboard shows new alert (after refresh or 30 seconds)

---

## 🐛 Troubleshooting

### Problem: "Could not connect to watchful backend"

**Solution:**
1. Check backend is running: `http://localhost:5000`
2. Check API_BASE_URL in `config.js` matches backend port
3. If on different device, use IP address instead of localhost

### Problem: "Failed to send fall alert"

**Solution:**
1. Check backend is running
2. Check patient_id exists in watchful system
3. Check browser console for detailed error
4. Check CORS settings (backend should allow all origins)

### Problem: Dashboard doesn't show alerts

**Solution:**
1. Check dashboard API_BASE_URL points to correct port (5000)
2. Click "Refresh" button on dashboard
3. Wait 30 seconds (auto-refresh interval)
4. Check browser console for errors
5. Verify caregiver_id matches: `caregiver_demo`

### Problem: CORS errors

**Solution:**
- Backend already has CORS enabled with `allow_origins=["*"]`
- If still getting errors, check backend is actually running
- Make sure you're accessing from `http://` not `file://` (use a web server)

---

## 📱 Mobile Device Setup

### Option 1: Serve via Local Web Server

**On your computer:**
```bash
cd /Users/riddhi/Downloads/motion-patient-main
python -m http.server 8080
```

**On phone:**
- Connect to same WiFi network
- Open: `http://[your-computer-ip]:8080`
- Example: `http://192.168.1.100:8080`

### Option 2: Use ngrok (For Testing)

**Install ngrok:**
```bash
brew install ngrok  # Mac
# OR download from ngrok.com
```

**Expose backend:**
```bash
ngrok http 5000
```

**Use the ngrok URL in motion-patient config:**
```javascript
API_BASE_URL: 'https://abc123.ngrok.io'
```

---

## 🔄 Real-Time Updates

### Current Setup:
- Dashboard polls every **30 seconds** for new alerts
- Motion-patient sends alerts **immediately** when fall detected

### To Make It More Real-Time:

**Option 1: Reduce Polling Interval**

Edit `/Users/riddhi/Documents/GitHub/watchful/app/page.js`:
```javascript
const interval = setInterval(fetchDashboardData, 5000); // 5 seconds instead of 30
```

**Option 2: Add WebSocket (Advanced)**

Would require backend WebSocket support (not currently implemented)

---

## 📊 Monitoring the System

### What to Watch:

**Backend Terminal:**
- New alerts appear: `Demo mode: Alert created - fall for patient patient_demo`
- Errors if any

**Dashboard:**
- Alert count increases
- New alerts appear in "Active Alerts"
- Alert status changes when acknowledged

**Patient Device:**
- Console shows connection status
- Fall log shows sent status
- Visual indicators (red status, fall log)

---

## 🎯 Quick Test Script

**Run this in browser console on patient device:**
```javascript
// Test connection
testWatchfulConnection().then(result => {
  console.log('Connection test:', result);
});

// Simulate fall
window.dispatchEvent(new DeviceMotionEvent('devicemotion', {
  accelerationIncludingGravity: { x: 0, y: 0, z: 30 }
}));
```

**Then check:**
1. Console shows alert sent
2. Backend terminal shows alert received
3. Dashboard shows new alert

---

## 🎓 Summary

**The Complete Connection:**

1. **Backend** (port 5000) - Receives and stores alerts
2. **Motion-Patient** - Sends alerts to backend when fall detected
3. **Dashboard** - Fetches alerts from backend every 30 seconds

**Key Files:**
- `motion-patient-main/js/config.js` - Device configuration
- `watchful/config/api.js` - Dashboard API configuration
- `watchful/app.py` - Backend server

**Key Settings:**
- All must use same port: **5000**
- All must use same patient_id: **patient_demo**
- All must use same caregiver_id: **caregiver_demo**

That's it! When a fall is detected on the device, it automatically appears on the caregiver dashboard! 🎉
