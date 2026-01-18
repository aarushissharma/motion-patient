# 🚨 IMMEDIATE FIX - Port 5000 → 5001

## ✅ What I Just Fixed

I've added **multiple layers of port fixing** that run immediately:

1. ✅ **HTML-level fix** - Runs before any JavaScript loads
2. ✅ **Config-level fix** - Runs when config.js loads
3. ✅ **Main.js fix** - Runs when main.js loads
4. ✅ **UI update fix** - Forces correct port in UI display

## 🔄 What You Need to Do

### Step 1: Hard Refresh the Page

**This is critical - you MUST hard refresh:**

- **Mac:** `Cmd + Shift + R`
- **Windows:** `Ctrl + Shift + R`
- **Or:** `Cmd/Ctrl + F5`

**This clears the browser cache and loads the fixed code.**

### Step 2: Wait 10 Seconds

After refreshing, wait 10 seconds. The app will:
- ✅ Auto-detect port mismatch
- ✅ Fix it automatically
- ✅ Show: `API: http://localhost:5001`
- ✅ Connect to backend

### Step 3: Verify Backend is Running

**Check your backend terminal - should show:**
```
INFO:     Uvicorn running on http://0.0.0.0:5001
```

**Test in browser:**
- Go to: `http://localhost:5001`
- Should see: `{"message":"Caregiver Alert System API","status":"running"}`

---

## 🎯 Expected Result

After hard refresh:
- ✅ `API: http://localhost:5001` (correct port)
- ✅ `✅ Connected` (if backend is running)
- ✅ `Last update: [current time]`

---

## 🆘 If Still Not Working

### Option 1: Clear All Storage (Browser Console)

1. Open console (F12)
2. Run:
   ```javascript
   localStorage.clear()
   sessionStorage.clear()
   location.reload(true)
   ```

### Option 2: Check Backend Port

**Verify backend is actually on port 5001:**

```bash
# In backend terminal, should show:
INFO:     Uvicorn running on http://0.0.0.0:5001
```

**If backend shows port 5000, you have two options:**

**Option A: Change backend to 5001**
- Edit: `/Users/riddhi/Documents/GitHub/watchful/app.py`
- Find: `uvicorn.run(app, host="0.0.0.0", port=5000)`
- Change to: `uvicorn.run(app, host="0.0.0.0", port=5001)`
- Restart backend

**Option B: Change motion-patient to 5000**
- Edit: `js/config.js`
- Change: `API_BASE_URL: 'http://localhost:5000'`
- Hard refresh page

---

## ✅ Summary

**The fix is now built into the code!** Just:

1. **Hard refresh** (`Cmd+Shift+R` or `Ctrl+Shift+R`)
2. **Wait 10 seconds**
3. **Should connect automatically**

The port will be **automatically fixed** on every page load now! 🚀
