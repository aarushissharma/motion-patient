# 📱 Fix iOS Motion Permission - Step by Step

## 🔍 Finding Motion Permission on iOS

The setting location varies by iOS version. Try these:

### Method 1: Privacy & Security Settings

1. Open **Settings** app on your iPhone
2. Scroll down to **Safari**
3. Tap **Safari**
4. Scroll down to **Privacy & Security** section
5. Look for **"Motion & Orientation Access"** or **"Motion & Fitness"**
6. Make sure it's **ON** (green)

### Method 2: Site-Specific Permissions

1. Open Safari on your iPhone
2. Go to `http://169.233.235.205:8080`
3. Tap the **AA** icon in the address bar (or the **aA** icon)
4. Look for **"Website Settings"** or **"Page Settings"**
5. Check for **"Motion & Orientation"** or **"Device Motion"**
6. Set it to **"Allow"**

### Method 3: Privacy Settings (iOS 13+)

1. Open **Settings** app
2. Go to **Privacy & Security**
3. Scroll down to **Motion & Fitness**
4. Make sure it's **ON**
5. Check if Safari is listed and enabled

### Method 4: Reset Website Data

If you still can't find it:

1. Open **Settings** → **Safari**
2. Scroll to **Advanced**
3. Tap **Website Data**
4. Search for your IP: `169.233.235.205`
5. Swipe left and tap **Delete**
6. Go back to the app and try again

---

## 🔄 Alternative: Use Different Browser

If Safari doesn't work, try:

### Chrome on iOS:
1. Download Chrome from App Store
2. Open `http://169.233.235.205:8080` in Chrome
3. Chrome handles motion permissions differently

### Firefox on iOS:
1. Download Firefox from App Store  
2. Open the URL in Firefox
3. May have better motion support

---

## 🧪 Test Without Motion Permission

If you can't get motion permission to work, you can still test the connection:

1. Open `http://169.233.235.205:8080` on your phone
2. Check if connection shows "✅ Connected"
3. Even without motion, the connection should work
4. The dashboard will show connection status

---

## 💡 Quick Fix: Try This First

1. **Close Safari completely** (swipe up and swipe Safari away)
2. **Open Safari again**
3. Go to `http://169.233.235.205:8080`
4. When you click "Enable Motion", Safari should ask for permission
5. Tap **"Allow"** when prompted

If Safari doesn't prompt you, the permission might already be denied. Try Method 4 above to reset it.

---

## 🔍 Still Can't Find It?

**Which iOS version are you using?**
- iOS 13+: Settings → Privacy & Security → Motion & Fitness
- iOS 12: Settings → Safari → Motion & Orientation Access
- Older: May not be available

**Alternative Solution:**
We can modify the app to work without motion permission for testing, or use a different detection method.
