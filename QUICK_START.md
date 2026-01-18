# 🚀 Quick Start Guide - Baby Steps

## Step-by-Step Setup (Copy & Paste Ready)

### Step 1: Start Watchful Backend
```bash
# Open terminal and run:
cd /Users/riddhi/Documents/GitHub/watchful
python app.py
# OR if you use uvicorn:
# uvicorn app:app --reload
```

**What to expect:**
- Terminal shows: `Uvicorn running on http://0.0.0.0:5000`
- Open browser: `http://localhost:5000`
- Should see: `{"message": "Caregiver Alert System API", "status": "running"}`

✅ **If you see that, backend is working!**

---

### Step 2: Open Motion-Patient App
1. Open `index.html` in your browser
   - Double-click the file, OR
   - Right-click → Open with → Browser

2. Open Developer Console
   - Press `F12` (or `Cmd+Option+I` on Mac)
   - Click "Console" tab

**What to expect:**
- Should see: `✅ Connected to watchful backend`
- OR: `⚠️ Could not connect...` (if backend not running)

---

### Step 3: Enable Motion Tracking
1. Click the **"Enable Motion"** button
2. Grant permission when browser asks
3. Button disappears (that's normal!)

**What to expect:**
- Status shows: "Status: NORMAL"
- Motion data appears in the debug area

---

### Step 4: Test Fall Detection
**Option A: Real Device (Phone/Tablet)**
- Shake your device hard (simulate a fall)
- Watch the status turn red
- Check console for: `✅ Fall alert sent to watchful`

**Option B: Simulate in Browser**
- Open console (F12)
- Type: `window.dispatchEvent(new DeviceMotionEvent('devicemotion', { accelerationIncludingGravity: { x: 0, y: 0, z: 30 } }))`
- This simulates a high acceleration (fall)

---

### Step 5: Verify Alert Was Sent
1. **In Motion-Patient App:**
   - Check fall log: Should show `✓ Sent` next to fall

2. **In Watchful Backend:**
   - Check terminal logs (should show alert received)
   - Or check watchful dashboard if you have one

---

## 🎯 What Each File Does (Super Simple)

### `js/config.js`
**Purpose:** Settings file
**Contains:**
- Where watchful backend is (`http://localhost:5000`)
- Which patient this is (`patient_demo`)
- On/off switch

**You edit this if:** Backend is on different computer/port

---

### `js/api.js`
**Purpose:** Does the actual sending
**Contains:**
- `getCurrentLocation()` - Gets GPS coordinates
- `sendFallAlertToWatchful()` - Sends alert to watchful
- `testWatchfulConnection()` - Tests if backend is reachable

**You edit this if:** Need to change what data is sent

---

### `js/main.js`
**Purpose:** Main coordinator
**What it does:**
- Listens for falls
- Shows them on screen
- Calls `sendFallAlertToWatchful()` when fall happens

**You edit this if:** Need to change UI behavior

---

## 🔍 How to Check If It's Working

### ✅ Good Signs:
- Console shows: `✅ Connected to watchful backend`
- Console shows: `✅ Fall alert sent to watchful`
- Fall log shows: `✓ Sent`
- Watchful backend terminal shows alert received

### ❌ Bad Signs:
- Console shows: `⚠️ Could not connect...`
- Console shows: `❌ Failed to send fall alert`
- Fall log shows: `✗ Failed`
- Browser console shows red errors

---

## 🛠️ Common Fixes

### "Could not connect to watchful backend"
**Fix:** Make sure watchful backend is running
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python app.py
```

### "Failed to send fall alert"
**Fix 1:** Check backend is running (same as above)

**Fix 2:** Check patient ID exists in watchful
- Open watchful backend
- Check if `patient_demo` exists
- Or change `PATIENT_ID` in `config.js` to an existing patient

**Fix 3:** Check CORS (usually not needed, but if errors mention CORS)
- Watchful backend should already allow CORS
- Check `app.py` has: `allow_origins=["*"]`

---

## 📝 Simple Test Checklist

- [ ] Watchful backend running (`http://localhost:5000` works)
- [ ] Motion-patient app opens in browser
- [ ] Console shows: `✅ Connected to watchful backend`
- [ ] "Enable Motion" button works
- [ ] Motion tracking shows data
- [ ] Simulate fall (shake device)
- [ ] Fall appears in fall log
- [ ] Console shows: `✅ Fall alert sent to watchful`
- [ ] Fall log shows: `✓ Sent`

**If all checked ✅, it's working!**

---

## 🎓 Understanding the Code Flow

```
1. Device detects motion
   ↓
2. movement.js calculates: "Is this a fall?"
   ↓
3. main.js receives: "FALL detected!"
   ↓
4. main.js shows red alert on screen
   ↓
5. main.js calls: sendFallAlertToWatchful(data)
   ↓
6. api.js gets location (GPS)
   ↓
7. api.js packages data into JSON
   ↓
8. api.js sends HTTP POST to http://localhost:5000/api/alerts
   ↓
9. Watchful backend receives it
   ↓
10. Watchful saves to database
   ↓
11. api.js gets response: "Success!"
   ↓
12. UI shows: ✓ Sent
```

---

## 💡 Pro Tips

1. **Keep console open** - You'll see all the messages there
2. **Check both terminals** - Watchful backend terminal shows when alerts arrive
3. **Test connection first** - Make sure `✅ Connected` appears before testing falls
4. **Use real device** - Motion detection works better on phones/tablets than laptops

---

## 🆘 Still Not Working?

1. **Check browser console** - Look for red error messages
2. **Check watchful backend terminal** - Look for error messages
3. **Verify URLs match** - Make sure `config.js` has correct backend URL
4. **Check network** - Make sure no firewall blocking localhost:5000
5. **Try different browser** - Sometimes Safari works better for motion on Mac

---

## 📞 What to Tell Me If You Need Help

Include:
- What you see in browser console
- What you see in watchful backend terminal
- What error messages appear
- Which step you're stuck on

This helps me help you faster! 🚀
