# 🔧 Force Fix Connection Issue

## ❌ Problem
Motion-patient app shows:
- ❌ Disconnected
- API: http://localhost:5000 (wrong port)
- Backend is actually running on port 5001

## ✅ Quick Fix (3 Steps)

### Step 1: Clear Browser Cache

**Option A: Hard Refresh (Easiest)**
- **Mac:** Press `Cmd + Shift + R`
- **Windows/Linux:** Press `Ctrl + Shift + R`
- This clears cache and reloads the page

**Option B: Clear LocalStorage (Browser Console)**
1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.clear()
   ```
3. Refresh page (F5)

### Step 2: Verify Backend is Running

**Check backend terminal - should show:**
```
INFO:     Uvicorn running on http://0.0.0.0:5001
```

**Test backend in browser:**
- Go to: `http://localhost:5001`
- Should see: `{"message":"Caregiver Alert System API","status":"running"}`

### Step 3: Refresh Motion-Patient App

1. **Hard refresh the page:**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

2. **Check connection status:**
   - Should now show: `API: http://localhost:5001`
   - Should connect within 10 seconds

---

## 🔍 What Was Fixed

The app now:
1. ✅ **Auto-detects port mismatches** on page load
2. ✅ **Automatically fixes** cached wrong ports
3. ✅ **Forces correct port** (5001) to be used
4. ✅ **Shows notification** when port is corrected

---

## ✅ Expected Result

After hard refresh:
- ✅ `API: http://localhost:5001` (correct port)
- ✅ `✅ Connected` (if backend is running)
- ✅ `Last update: [current time]`

---

## 🆘 If Still Not Working

### Check 1: Backend Port
```bash
# In backend terminal, should see:
INFO:     Uvicorn running on http://0.0.0.0:5001
```

If it shows port 5000, you need to either:
- Change backend to use port 5001, OR
- Change motion-patient config to use port 5000

### Check 2: Browser Console
1. Open console (F12)
2. Look for messages like:
   - `✅ Port is correct: http://localhost:5001`
   - `🔧 Port mismatch detected...`
3. Check for any errors

### Check 3: Manual Fix
Run in browser console:
```javascript
// Clear cache
localStorage.clear()

// Set correct URL
localStorage.setItem('watchful_api_url', 'http://localhost:5001')

// Refresh
location.reload()
```

---

## 🎯 Summary

**The fix is automatic now!** Just:
1. **Hard refresh** the page (`Cmd+Shift+R` or `Ctrl+Shift+R`)
2. **Wait 10 seconds** for connection check
3. **Should connect** automatically

That's it! 🚀
