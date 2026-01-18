# 📱 iOS 18.6.2 Motion Permission Fix

## ✅ Exact Steps for iOS 18.6.2

### Method 1: Privacy & Security (Most Common)

1. Open **Settings** app
2. Scroll down and tap **Privacy & Security**
3. Scroll down to find **Motion & Fitness** (it's in the list with other privacy settings)
4. Tap **Motion & Fitness**
5. Make sure the toggle is **ON** (green)
6. Go back to Safari and try "Enable Motion" again

### Method 2: Safari-Specific Settings

1. Open **Settings** app
2. Scroll down and tap **Safari**
3. Scroll down to **Privacy & Security** section
4. Look for **"Prevent Cross-Site Tracking"** - make sure it's OFF (for testing)
5. Scroll further down - there might be motion-related settings
6. Go back to Safari and try again

### Method 3: Site Permissions (iOS 18 Feature)

1. In Safari, go to `http://169.233.235.205:8080`
2. Tap the **aA** icon in the address bar (left side)
3. Tap **Website Settings**
4. Look for **"Motion & Orientation"** or **"Device Motion"**
5. Set it to **"Allow"**
6. Go back and click "Enable Motion"

### Method 4: Reset Safari Permissions

1. **Settings** → **Safari**
2. Scroll to bottom → **Advanced**
3. Tap **Website Data**
4. Search for `169.233.235.205` or scroll to find it
5. Swipe left on the entry → **Delete**
6. Go back to the app and try again

### Method 5: Close Safari Completely

1. **Swipe up** from bottom (or double-tap home button on older iPhones)
2. **Swipe up** on Safari to close it completely
3. **Reopen Safari**
4. Go to `http://169.233.235.205:8080`
5. Click "Enable Motion" - Safari should prompt you
6. Tap **"Allow"** when asked

---

## 🔍 If You Still Can't Find It

iOS 18 might have changed the location. Try this:

1. Open **Settings**
2. Use the **Search bar at the top**
3. Type: **"motion"** or **"fitness"**
4. Tap the result that says **"Motion & Fitness"**
5. Make sure it's **ON**

---

## 🧪 Test Connection First (Without Motion)

Even without motion permission, you can test if the connection works:

1. Open `http://169.233.235.205:8080` on your phone
2. Look at the **"Real-time Connection"** section
3. It should show:
   - ✅ **Connected** (green checkmark)
   - API: `http://169.233.235.205:5001`

If it shows "Connected", the connection is working! Motion permission is only needed to detect movement.

---

## 💡 Alternative: Test with Manual Button

I can add a "Test Connection" button that sends test data without needing motion permission. Would you like me to add that?

---

## 🆘 Still Not Working?

If none of these work, it's possible that:
1. Your iPhone model doesn't support motion sensors
2. iOS 18 has additional restrictions
3. Safari has motion disabled at a system level

**Try this:**
- Use **Chrome** app from App Store instead of Safari
- Or test the connection without motion (it should still work for sending data)
