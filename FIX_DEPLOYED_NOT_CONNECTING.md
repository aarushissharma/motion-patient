# 🔧 Fix: Deployed App Not Connecting to Dashboard

## ❌ Problem
- Deployed app shows "fall detected" ✅
- But nothing appears on dashboard (localhost:3000) ❌
- Backend (localhost:5001) not receiving data ❌

## 🔍 Root Cause
The deployed app is detecting falls but **not sending them to the backend** via ngrok.

---

## ✅ Step-by-Step Fix

### Step 1: Verify Deployed App Connection

**On the deployed app** (`https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://gubernacular-flavorfully-mathew.ngrok-free.dev`):

1. **Open browser console** (F12 or right-click → Inspect → Console)
2. **Check "Real-time Connection" section** on the page
   - Should show: "✅ Connected"
   - API should be: `https://gubernacular-flavorfully-mathew.ngrok-free.dev`
3. **If it shows "❌ Disconnected":**
   - The `?api_url=` parameter might not be working
   - Try refreshing the page
   - Check the URL has the full ngrok URL

### Step 2: Test Connection from Deployed App

**In the browser console on deployed app, run:**
```javascript
// Check what API URL is being used
console.log('API URL:', localStorage.getItem('watchful_api_url'));

// Test connection
fetch('https://gubernacular-flavorfully-mathew.ngrok-free.dev/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend reachable:', d))
  .catch(e => console.error('❌ Backend NOT reachable:', e));
```

**What you should see:**
- `API URL: https://gubernacular-flavorfully-mathew.ngrok-free.dev`
- `✅ Backend reachable: {message: "Caregiver Alert System API", status: "running"}`

**If you see errors:**
- ngrok might not be running
- ngrok URL might have changed
- CORS issue

### Step 3: Check ngrok is Still Running

**In the ngrok terminal, verify:**
- Still shows "Session Status: online"
- Still shows forwarding to `http://localhost:5001`
- No errors

**If ngrok stopped:**
```bash
ngrok http 5001
```
**Get the NEW URL and update the deployed app URL!**

### Step 4: Check Backend is Running

**In backend terminal:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Should see:**
```
Uvicorn running on http://0.0.0.0:5001
```

### Step 5: Test ngrok URL Directly

**Open in browser:**
```
https://gubernacular-flavorfully-mathew.ngrok-free.dev
```

**Should see:**
```json
{"message":"Caregiver Alert System API","status":"running"}
```

**If you see an error:**
- ngrok is not forwarding correctly
- Backend is not running
- Restart both

### Step 6: Drop Phone and Check Backend Terminal

**After dropping phone on deployed app:**

**Check backend terminal** - should see:
```
✅ Demo mode: Motion data received for patient_demo: FALL (mag: XX.XX)
✅ Demo mode: Fall history received for patient_demo: X falls
```

**If you DON'T see these:**
- Data is not reaching backend
- Check deployed app console for errors
- Check ngrok is forwarding

---

## 🧪 Quick Test

1. **Open deployed app** with ngrok URL parameter
2. **Open browser console** (F12)
3. **Check connection status** - should be "✅ Connected"
4. **Drop phone**
5. **Check console** - should see "✅ Fall alert sent"
6. **Check backend terminal** - should see "Motion data received"
7. **Check dashboard** - should see data within 2-5 seconds

---

## 🔧 Common Issues

### Issue 1: Deployed App Not Using ngrok URL

**Fix:**
- Make sure URL is: `https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://gubernacular-flavorfully-mathew.ngrok-free.dev`
- Check browser console for API URL being used
- Clear browser cache and try again

### Issue 2: ngrok Stopped or URL Changed

**Fix:**
- Restart ngrok: `ngrok http 5001`
- Get NEW ngrok URL
- Update deployed app URL with new ngrok URL

### Issue 3: Backend Not Running

**Fix:**
- Start backend: `python3 app.py`
- Verify it shows: `Uvicorn running on http://0.0.0.0:5001`

### Issue 4: CORS Error

**Fix:**
- Backend should already allow CORS (`allow_origins=["*"]`)
- Check backend terminal for CORS errors

---

## 📊 What to Check

After dropping phone:

1. **Deployed app console** - Shows "✅ Fall alert sent"?
2. **Backend terminal** - Shows "Motion data received"?
3. **Dashboard console** - Shows "Motion data for patient_demo"?
4. **Dashboard UI** - Shows motion data?

Tell me what you see in each step!
