# 🚀 How to Make Sure Your Backend is Running

## Quick Check: Is Backend Running?

### Method 1: Check in Browser (Easiest)
1. Open your browser
2. Go to: `http://localhost:5000`
3. **If you see this JSON:**
   ```json
   {"message": "Caregiver Alert System API", "status": "running"}
   ```
   ✅ **Backend is running!**

4. **If you see an error or "can't connect":**
   ❌ **Backend is NOT running** - Continue to "How to Start Backend" below

---

### Method 2: Check in Terminal
Open Terminal and run:
```bash
curl http://localhost:5000/
```

**If you see JSON response:** ✅ Backend is running
**If you see "Connection refused" or error:** ❌ Backend is NOT running

---

## How to Start the Backend

### Step 1: Open a Terminal Window
- **Mac:** Press `Cmd + Space`, type "Terminal", press Enter
- **Windows:** Press `Win + R`, type `cmd`, press Enter

### Step 2: Navigate to Watchful Directory
```bash
cd /Users/riddhi/Documents/GitHub/watchful
```

### Step 3: Start the Backend Server

**Option A: Using Python (Recommended)**
```bash
python3 app.py
```

**Option B: If that doesn't work, try:**
```bash
python app.py
```

**Option C: Using uvicorn directly**
```bash
uvicorn app:app --reload --port 5000
```

### Step 4: Look for Success Message

**You should see output like:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:5000 (Press CTRL+C to quit)
```

**OR:**
```
Firebase initialized successfully
Uvicorn running on http://0.0.0.0:5000
```

✅ **If you see this, backend is starting!**

### Step 5: Verify It's Working
1. **Keep the terminal open** (don't close it!)
2. Open a new browser tab
3. Go to: `http://localhost:5000`
4. Should see: `{"message": "Caregiver Alert System API", "status": "running"}`

---

## ⚠️ Important Notes

### Keep Backend Running
- **Don't close the terminal** where backend is running
- **Don't press Ctrl+C** in that terminal
- The backend must stay running for the motion-patient app to connect

### To Stop Backend
- Press `Ctrl+C` in the terminal where backend is running
- Or close that terminal window

---

## 🐛 Troubleshooting

### Problem: "python3: command not found"
**Solution:** Install Python or use `python` instead:
```bash
python app.py
```

### Problem: "Module not found: fastapi" or "Module not found: uvicorn"
**Solution:** Install dependencies:
```bash
cd /Users/riddhi/Documents/GitHub/watchful
pip3 install -r requirements.txt
```

**OR install manually:**
```bash
pip3 install fastapi uvicorn python-dotenv firebase-admin geopy
```

### Problem: "Port 5000 already in use"
**Solution 1: Kill the process using port 5000**
```bash
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

**Solution 2: Use a different port**
Edit `app.py` (last line):
```python
uvicorn.run(app, host="0.0.0.0", port=8000)  # Changed to 8000
```

Then update `js/config.js`:
```javascript
API_BASE_URL: 'http://localhost:8000',
```

### Problem: Backend starts but motion-patient still shows "Disconnected"
**Check:**
1. Is backend actually running? (Check terminal)
2. Can you access `http://localhost:5000` in browser?
3. Refresh the motion-patient page (F5)
4. Check browser console (F12) for errors

---

## ✅ Quick Checklist

- [ ] Terminal is open
- [ ] Navigated to `/Users/riddhi/Documents/GitHub/watchful`
- [ ] Ran `python3 app.py`
- [ ] Terminal shows "Uvicorn running on http://0.0.0.0:5000"
- [ ] Browser `http://localhost:5000` shows JSON response
- [ ] Motion-patient app shows "✅ Connected"

---

## 🎯 What Should Happen

**Before starting backend:**
```
❌ Disconnected
Never updated
API: http://localhost:5000
```

**After starting backend:**
```
✅ Connected
Last update: [current time]
API: http://localhost:5000
```

---

## 📝 Summary

1. **Open Terminal**
2. **Run:** `cd /Users/riddhi/Documents/GitHub/watchful`
3. **Run:** `python3 app.py`
4. **Keep terminal open**
5. **Verify:** Open `http://localhost:5000` in browser
6. **Check motion-patient app:** Should now show "✅ Connected"

That's it! 🚀
