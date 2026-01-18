# Exact Changes Made to motion-patient-main

## 📝 Modified Files

### 1. `js/config.js`
**Changes:**
- **Line 18-21**: Added Vercel detection - auto-detects if running on Vercel and uses `window.location.origin` instead of hardcoded `localhost:5001`
- **Line 19-21**: Changed default URL from `http://localhost:5001` to `http://localhost:3001` (for local) or Vercel origin (for deployed)
- **Line 40-42**: Updated `API_BASE_URL` to auto-detect Vercel using `window.location.hostname.includes('vercel.app')`

**Before:**
```javascript
const correctUrl = 'http://localhost:5001';
API_BASE_URL: 'http://localhost:5001',
```

**After:**
```javascript
const isVercel = window.location.hostname.includes('vercel.app');
const correctUrl = isVercel 
  ? window.location.origin  // Use Vercel domain when deployed
  : 'http://localhost:3001'; // Local server for development
```

---

### 2. `js/api.js`
**Changes:**
- **Line 89-93**: Added Vercel detection in `sendFallAlertToWatchful()` function
- **Line 95-126**: Added code to send falls to Vercel API (`/api/alerts`) in addition to Watchful backend
- **Line 169-190**: Updated `sendMotionDataToWatchful()` to also send to Vercel API
- **Line 125-166**: Updated `testWatchfulConnection()` to test Vercel API endpoint (`/api/status`) instead of root

**Key Addition:**
```javascript
// Determine API URL - use current origin if on Vercel, otherwise localhost
const isVercel = window.location.hostname.includes('vercel.app');
const apiBaseUrl = isVercel 
  ? window.location.origin  // Use Vercel domain
  : 'http://localhost:3001'; // Local development

// Send to API (works for both Vercel and local)
const apiResponse = await fetch(`${apiBaseUrl}/api/alerts`, {
  method: 'POST',
  // ... sends fall data
});
```

---

### 3. `js/main.js`
**Changes:**
- **Line 173-193**: Updated `fixPortOnLoad()` function to `fixApiUrlOnLoad()` 
- Changed from hardcoded `http://localhost:5001` to auto-detect Vercel
- **Line 201-216**: Added force update for Vercel URL in DOMContentLoaded event

**Before:**
```javascript
const correctUrl = 'http://localhost:5001';
```

**After:**
```javascript
const isVercel = window.location.hostname.includes('vercel.app');
const correctUrl = isVercel 
  ? window.location.origin  // Use Vercel domain when deployed
  : 'http://localhost:3001'; // Local server for development
```

---

### 4. `index.html`
**Changes:**
- **Line 37**: Changed default API URL display from `http://localhost:5001` to `Loading...`
- **Line 66-73**: Updated inline script to detect Vercel and use correct URL

**Before:**
```html
<div id="apiUrl">API: <span id="apiUrlValue">http://localhost:5001</span></div>
```

**After:**
```html
<div id="apiUrl">API: <span id="apiUrlValue">Loading...</span></div>
```

And in script:
```javascript
const isVercel = hostname.includes('vercel.app');
const correctUrl = isVercel
  ? window.location.origin  // Use Vercel domain (no port needed)
  : (hostname === 'localhost' || hostname === '127.0.0.1' 
    ? 'http://localhost:3001' 
    : 'http://' + hostname + ':3001');
```

---

### 5. `package.json`
**Changes:**
- **Line 6-8**: Added `engines` field with Node.js 24.x requirement (required by Vercel)

**Added:**
```json
"engines": {
  "node": "24.x"
}
```

---

## 🆕 New Files Created

### 1. `api/status.js` (NEW)
- Vercel serverless function for status endpoint
- Returns server status and patient info
- Endpoint: `GET /api/status`

### 2. `api/alerts.js` (NEW)
- Vercel serverless function for alerts/falls
- Handles `GET /api/alerts` (returns all alerts)
- Handles `POST /api/alerts` (saves new fall)
- Stores falls in memory (resets on function restart)

### 3. `api/patient.js` (NEW)
- Vercel serverless function for patient info
- Handles `GET /api/patient` (returns patient info)
- Handles `POST /api/patient` (updates patient info)

### 4. `api/motion.js` (NEW)
- Vercel serverless function for motion data
- Handles `GET /api/motion` (returns motion data)
- Handles `POST /api/motion` (saves motion data)

### 5. `vercel.json` (NEW)
- Vercel configuration file
- Sets CORS headers for all `/api/*` routes
- Allows cross-origin requests from motion-main dashboard

---

## 📊 Summary

### Files Modified: 5
1. `js/config.js` - Vercel auto-detection
2. `js/api.js` - Send to Vercel API
3. `js/main.js` - Fix API URL detection
4. `index.html` - Fix API URL display
5. `package.json` - Add Node.js version

### Files Created: 5
1. `api/status.js` - Status API endpoint
2. `api/alerts.js` - Alerts/Falls API endpoint
3. `api/patient.js` - Patient API endpoint
4. `api/motion.js` - Motion data API endpoint
5. `vercel.json` - Vercel configuration

### Key Changes:
- ✅ Auto-detects Vercel deployment
- ✅ Uses Vercel API when deployed (instead of localhost)
- ✅ Sends falls to Vercel API endpoints
- ✅ Creates API endpoints for motion-main to consume
- ✅ Maintains backward compatibility (still works locally)

---

## 🔄 What Still Works

- ✅ Local development (uses `localhost:3001`)
- ✅ Original Watchful backend connection (optional, still tries to connect)
- ✅ All existing functionality preserved
- ✅ Falls still detected and logged locally

---

## 🎯 What's New

- ✅ Auto-detects Vercel and uses correct API URL
- ✅ Sends data to Vercel API endpoints
- ✅ API endpoints available for motion-main dashboard
- ✅ Works seamlessly on Vercel deployment
