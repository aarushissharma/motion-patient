# ✅ Complete Working Setup Guide

## 🚀 Quick Start (Easiest Way)

### Option 1: Use the Startup Script (Recommended)

**Just run this one command:**

```bash
cd /Users/riddhi/Downloads/motion-patient-main
./START_EVERYTHING.sh
```

This will start:
- ✅ Backend (port 5000)
- ✅ Dashboard (port 3000)  
- ✅ Motion-Patient server (port 8080)

**Then open:**
- Dashboard: `http://localhost:3000`
- Motion-Patient: `http://localhost:8080`
- Test Page: `http://localhost:8080/test-connection.html`

---

### Option 2: Manual Start (3 Terminals)

**Terminal 1 - Backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Terminal 2 - Dashboard:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```

**Terminal 3 - Motion-Patient:**
```bash
cd /Users/riddhi/Downloads/motion-patient-main
python3 -m http.server 8080
```

---

## 🧪 Test Everything is Working

### Step 1: Test Backend
Open: `http://localhost:5000`

**Should see:**
```json
{"message": "Caregiver Alert System API", "status": "running"}
```

### Step 2: Test Connection Page
Open: `http://localhost:8080/test-connection.html`

**Click all 3 test buttons:**
- ✅ Test Backend - Should show success
- ✅ Send Test Alert - Should send alert
- ✅ Check Dashboard - Should show alerts

### Step 3: Test Dashboard
Open: `http://localhost:3000`

**Should see:**
- "✅ Connected to Watchful System" (green)
- Dashboard loads without errors

### Step 4: Test Motion-Patient
Open: `http://localhost:8080`

**Should see:**
- Motion-Patient app
- Console shows: "✅ Connected to watchful backend"
- Click "Enable Motion" button

### Step 5: Simulate Fall
**In Motion-Patient app:**
- Shake device hard
- OR open console (F12) and run:
```javascript
window.dispatchEvent(new DeviceMotionEvent('devicemotion', {
  accelerationIncludingGravity: { x: 0, y: 0, z: 30 }
}))
```

**Check:**
1. Motion-Patient console: `✅ Fall alert sent`
2. Backend terminal: `Demo mode: Alert created - fall`
3. Dashboard: Refresh and see new alert

---

## ✅ Verification Checklist

### Backend:
- [ ] Terminal shows: `Uvicorn running on http://0.0.0.0:5000`
- [ ] Browser `http://localhost:5000` shows JSON
- [ ] No errors in terminal

### Dashboard:
- [ ] Terminal shows Next.js server running
- [ ] Browser `http://localhost:3000` shows dashboard
- [ ] Shows "✅ Connected" (not "❌ Disconnected")
- [ ] No errors in browser console

### Motion-Patient:
- [ ] Server running on port 8080
- [ ] Browser `http://localhost:8080` shows app
- [ ] Console shows "✅ Connected to watchful backend"
- [ ] "Enable Motion" button works

### End-to-End:
- [ ] Fall detected on device
- [ ] Alert sent to backend
- [ ] Alert appears on dashboard
- [ ] All connections working

---

## 🔧 Configuration Files

### Motion-Patient Config
**File:** `motion-patient-main/js/config.js`
```javascript
API_BASE_URL: 'http://localhost:5000'  // ✅ Correct
PATIENT_ID: 'patient_demo'              // ✅ Correct
CAREGIVER_ID: 'caregiver_demo'          // ✅ Correct
ENABLED: true                           // ✅ Enabled
```

### Dashboard Config
**File:** `watchful/config/api.js`
```javascript
// ✅ Already updated to use port 5000
```

---

## 🐛 Troubleshooting

### Problem: Dashboard shows "❌ Disconnected"

**Solution:**
1. Make sure backend is running (Terminal 1)
2. Check `http://localhost:5000` works
3. Refresh dashboard (F5)
4. Check browser console for errors

### Problem: "Failed to send fall alert"

**Solution:**
1. Check backend is running
2. Check `http://localhost:5000` works
3. Check patient_id is correct (`patient_demo`)
4. Check browser console for detailed error

### Problem: Alert doesn't appear on dashboard

**Solution:**
1. Make sure alert was sent (check motion-patient console)
2. Check backend terminal shows alert received
3. Click "Refresh" on dashboard
4. Wait 30 seconds (auto-refresh)
5. Check dashboard is fetching from correct endpoint

### Problem: Port already in use

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

---

## 📊 How It All Works Together

```
┌─────────────────┐
│  Motion-Patient│  Detects fall
│  (Device)       │  ↓
└────────┬────────┘
         │ HTTP POST
         │ /api/alerts
         ▼
┌─────────────────┐
│  Watchful       │  Receives alert
│  Backend        │  Saves to database
│  (Port 5000)    │  ↓
└────────┬────────┘
         │ HTTP GET
         │ /api/caregivers/{id}/alerts
         ▼
┌─────────────────┐
│  Dashboard      │  Fetches alerts
│  (Port 3000)    │  Displays to caregiver
└─────────────────┘
```

---

## 🎯 What's Fixed

✅ **Backend connection** - Dashboard properly checks connection  
✅ **Alert format** - Alerts sent in correct format  
✅ **Patient ID** - Uses `patient_demo` which exists in backend  
✅ **Caregiver ID** - Uses `caregiver_demo` for fetching alerts  
✅ **Error handling** - Better error messages  
✅ **Test page** - Easy way to test everything  

---

## 📝 Files Created/Updated

1. ✅ `js/api.js` - Fixed alert format, added caregiver_id
2. ✅ `watchful/config/api.js` - Updated to port 5000
3. ✅ `watchful/app/components/RealtimeConnection.js` - Better connection check
4. ✅ `test-connection.html` - Test page for debugging
5. ✅ `START_EVERYTHING.sh` - One-command startup script

---

## 🚀 You're All Set!

Everything should work now. Just:

1. **Start everything** (use script or 3 terminals)
2. **Open dashboard** - Should show "✅ Connected"
3. **Open motion-patient** - Should connect
4. **Test fall** - Should appear on dashboard

**If something doesn't work:**
- Use `test-connection.html` to debug
- Check browser console (F12)
- Check backend terminal for errors
- See troubleshooting section above

---

## 🎉 Success Indicators

**Backend Working:**
- Terminal: `Uvicorn running on http://0.0.0.0:5000`
- Browser: `http://localhost:5000` shows JSON

**Dashboard Working:**
- Shows: "✅ Connected to Watchful System"
- No errors in console
- Can see patient list

**Motion-Patient Working:**
- Console: "✅ Connected to watchful backend"
- Can enable motion
- Falls are detected

**End-to-End Working:**
- Fall detected → Alert sent → Appears on dashboard ✅

---

That's it! Everything should work properly now! 🎉
