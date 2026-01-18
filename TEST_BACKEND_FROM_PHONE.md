# 🔍 Test Backend Connection from Phone

## Step-by-Step Debugging

### Step 1: Test Backend Directly from Phone

**On your phone's browser, open:**
```
http://169.233.235.205:5001
```

**You should see:**
```json
{"message":"Caregiver Alert System API","status":"running"}
```

**If you see this:** ✅ Backend is accessible from phone
**If you see error or "Can't connect":** ❌ Backend is NOT accessible

---

### Step 2: Check What You See

**Option A: You see the JSON response**
- ✅ Backend is working!
- The issue is with the app's API calls
- Try the test button again

**Option B: You see "Can't connect" or timeout**
- ❌ Backend is not accessible from phone
- Possible causes:
  1. Backend not running
  2. Firewall blocking port 5001
  3. Phone and computer on different networks
  4. Backend only listening on localhost

---

### Step 3: Fix Backend Accessibility

**Make sure backend is running:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Check it shows:**
```
Uvicorn running on http://0.0.0.0:5001
```

**Important:** Must say `0.0.0.0` (not `localhost` or `127.0.0.1`)

---

### Step 4: Check Firewall

**On your Mac:**
1. **System Settings** → **Network** → **Firewall**
2. Make sure firewall is configured to allow connections
3. Or temporarily disable firewall to test

**Or allow port 5001:**
```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/bin/python3
```

---

### Step 5: Verify Same Network

**On your phone:**
- Settings → WiFi
- Check the network name

**On your computer:**
- System Settings → Network → WiFi
- Check the network name

**They must be the same!**

---

## Quick Test Checklist

- [ ] Backend running: `python3 app.py` shows `Uvicorn running on http://0.0.0.0:5001`
- [ ] Can access `http://169.233.235.205:5001` from phone (shows JSON)
- [ ] Phone and computer on same WiFi network
- [ ] Firewall not blocking port 5001
- [ ] Backend shows `host="0.0.0.0"` in app.py

---

## What to Tell Me

After testing `http://169.233.235.205:5001` on your phone, tell me:
1. **What do you see?** (JSON response, error message, or "can't connect")
2. **Is backend running?** (Check terminal)
3. **Same WiFi network?** (Check both devices)

This will help me fix it!
