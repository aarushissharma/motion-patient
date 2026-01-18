# 🔧 Fix: Port Mismatch (5000 vs 5001)

## ❌ Problem
Motion-patient app shows: `API: http://localhost:5000` but backend is running on port **5001**.

## ✅ Solution

The app now **automatically detects and fixes** port mismatches on load. However, if you still see the wrong port:

### Quick Fix (Browser Console)

1. **Open motion-patient app** in browser
2. **Open console** (F12)
3. **Run:**
   ```javascript
   clearCachedApiUrl()
   ```
4. **Refresh the page** (F5)

### Manual Fix (Clear Browser Storage)

1. **Open browser console** (F12)
2. **Go to Application tab** (Chrome) or **Storage tab** (Firefox)
3. **Find Local Storage** → Your site
4. **Delete:** `watchful_api_url`
5. **Refresh page** (F5)

### Verify It's Fixed

After clearing, you should see:
- ✅ `API: http://localhost:5001` (correct port)
- ✅ Connection status updates
- ✅ "✅ Connected" if backend is running

---

## 🔍 Why This Happens

The app stores the API URL in browser localStorage. If you previously used port 5000, it might still be cached. The app now automatically fixes this on load, but you can manually clear it if needed.

---

## ✅ Expected Result

After fixing:
- **API URL shows:** `http://localhost:5001`
- **Connection works** (if backend is running on 5001)
- **Alerts send correctly** to the right port

---

## 🎯 Quick Test

1. **Clear cache:** `clearCachedApiUrl()` in console
2. **Refresh page:** F5
3. **Check API URL:** Should show port 5001
4. **Check connection:** Should connect if backend is running

That's it! 🚀
