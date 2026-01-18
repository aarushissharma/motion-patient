# ✅ Backend is Already Running!

## The Good News
Your backend is already running on port 5001! That's why you got "address already in use".

## The Issue
The test is failing, which means the phone can't reach the backend. Let's check:

### Step 1: Test Backend from Phone

**On your phone's browser, open:**
```
http://169.233.235.205:5001
```

**What do you see?**
- ✅ JSON response = Backend is accessible
- ❌ Error/timeout = Backend is NOT accessible

### Step 2: Check if Backend is Listening on 0.0.0.0

The backend might be running but only listening on `localhost` (not accessible from phone).

**To check, run this in Terminal:**
```bash
lsof -i :5001
```

Look for the address:
- `0.0.0.0:5001` = ✅ Accessible from phone
- `127.0.0.1:5001` or `localhost:5001` = ❌ NOT accessible from phone

### Step 3: Restart Backend Properly

If it's only listening on localhost, we need to restart it:

1. **Find and stop the current backend:**
   ```bash
   # Find the process
   lsof -ti:5001
   
   # Kill it (replace PID with the number from above)
   kill -9 PID
   ```

2. **Or kill all Python processes on port 5001:**
   ```bash
   kill -9 $(lsof -ti:5001)
   ```

3. **Start backend again:**
   ```bash
   cd /Users/riddhi/Documents/GitHub/watchful
   python3 app.py
   ```

4. **Verify it shows:**
   ```
   Uvicorn running on http://0.0.0.0:5001
   ```

### Step 4: Test Again

1. Test `http://169.233.235.205:5001` on your phone
2. Try the test button in the app again

---

## Quick Fix Command

Run this to restart the backend properly:

```bash
# Kill existing backend
kill -9 $(lsof -ti:5001) 2>/dev/null

# Start backend
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

Then test `http://169.233.235.205:5001` on your phone!
