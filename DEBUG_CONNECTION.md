# 🔍 Debug Connection Issues

## Test Failed - Let's Fix It!

The test failed, which means the phone can't reach the backend. Let's check:

### Step 1: Is Backend Running?

Open Terminal and check:
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

You should see:
```
Uvicorn running on http://0.0.0.0:5001
```

**Important:** It must say `0.0.0.0:5001` (not `localhost:5001`)

### Step 2: Test Backend from Phone

On your phone's browser, try to open:
```
http://169.233.235.205:5001
```

You should see JSON like:
```json
{"message":"Caregiver Alert System API","status":"running"}
```

**If you see this:** Backend is accessible ✅
**If you see "Can't connect" or error:** Backend is not accessible ❌

### Step 3: Check Firewall

Your Mac's firewall might be blocking port 5001. To check:

1. **System Settings** → **Network** → **Firewall**
2. Make sure firewall allows connections
3. Or temporarily disable firewall to test

### Step 4: Verify Backend Host

The backend MUST be running on `0.0.0.0:5001` (not `localhost:5001`)

Check the last line of `/Users/riddhi/Documents/GitHub/watchful/app.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=5001)
```

If it says `host="127.0.0.1"` or `host="localhost"`, change it to `host="0.0.0.0"`

---

## Quick Fix Steps

1. **Make sure backend is running:**
   ```bash
   cd /Users/riddhi/Documents/GitHub/watchful
   python3 app.py
   ```

2. **Test from phone:**
   - Open `http://169.233.235.205:5001` on phone
   - Should see JSON response

3. **If still not working:**
   - Check firewall settings
   - Make sure phone and computer are on same WiFi
   - Try restarting backend

---

## What to Check

- [ ] Backend is running (`python3 app.py`)
- [ ] Backend shows `Uvicorn running on http://0.0.0.0:5001`
- [ ] Can access `http://169.233.235.205:5001` from phone
- [ ] Phone and computer on same WiFi network
- [ ] Firewall not blocking port 5001
