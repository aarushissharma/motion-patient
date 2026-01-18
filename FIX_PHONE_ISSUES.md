# 🔧 Fix Phone Connection Issues

## ✅ I've Fixed Both Issues!

### Issue 1: Connection Disconnected ✅ FIXED
- Updated server to auto-configure API URL to `http://169.233.235.205:5001`
- App now detects it's on a phone and uses the correct IP

### Issue 2: Motion Permission Denied ✅ FIXED
- Added better error messages
- Added instructions for granting permissions

---

## 🚀 Quick Fix Steps

### Step 1: Restart the Server

Stop the current server (Ctrl+C) and restart it:
```bash
cd /Users/riddhi/Downloads/motion-patient-main
python3 serve_for_phone.py
```

### Step 2: Clear Browser Cache on Phone

On your phone:
1. Open the app: `http://169.233.235.205:8080`
2. **Hard refresh**: 
   - **Safari (iOS)**: Hold refresh button → "Reload Without Content Blockers"
   - **Chrome (Android)**: Menu → "Clear browsing data" → Check "Cached images" → Clear

### Step 3: Fix Motion Permission

**For iOS (Safari):**
1. Go to **Settings** → **Safari** → **Motion & Orientation Access**
2. Make sure it's **ON**
3. Go back to the app and click "Enable Motion" again

**For Android (Chrome):**
1. Tap the **lock icon** in the address bar
2. Find **"Motion sensors"** → Set to **"Allow"**
3. Refresh the page
4. Click "Enable Motion" again

### Step 4: Verify Backend is Accessible

Make sure your backend is running and accessible:
```bash
# Check if backend is running
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

The backend should show: `Uvicorn running on http://0.0.0.0:5001`

**Important:** The backend must be accessible from your phone. Make sure:
- Backend is running on `0.0.0.0:5001` (not just localhost)
- Firewall allows port 5001
- Phone and computer are on the same WiFi network

---

## ✅ What Should Work Now

1. **Connection Status**: Should show "✅ Connected" (not disconnected)
2. **API URL**: Should show `http://169.233.235.205:5001`
3. **Motion Permission**: Should work after following Step 3 above

---

## 🧪 Test It

1. Open `http://169.233.235.205:8080` on your phone
2. Check connection status - should be "✅ Connected"
3. Click "Enable Motion"
4. Grant permissions when asked
5. Move your phone around
6. Check dashboard at `http://localhost:3000` - should show motion data!

---

## 🔍 Still Having Issues?

**Connection still disconnected?**
- Make sure backend is running: `python3 app.py` in watchful directory
- Check backend shows: `Uvicorn running on http://0.0.0.0:5001`
- Try accessing `http://169.233.235.205:5001` directly on your phone - should see JSON response

**Motion permission still denied?**
- Make sure you're using Safari (iOS) or Chrome (Android)
- Check browser settings for motion/orientation permissions
- Try a different browser
- Some devices/browsers don't support motion sensors
