# 🔧 Fix: "Disconnected" Status on Dashboard

## ❌ Problem
Dashboard shows: `❌ Disconnected - Never updated - API: http://localhost:5000`

## ✅ Solution: Start the Backend Server

The dashboard is trying to connect to the backend, but the backend isn't running.

---

## 🚀 Step-by-Step Fix

### Step 1: Open a Terminal

**On Mac:**
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

**On Windows:**
- Press `Win + R`
- Type `cmd`
- Press Enter

---

### Step 2: Navigate to Watchful Directory

```bash
cd /Users/riddhi/Documents/GitHub/watchful
```

---

### Step 3: Start the Backend Server

**Option A: Using Python directly**
```bash
python app.py
```

**Option B: Using uvicorn (if you have it)**
```bash
uvicorn app:app --reload --port 5000
```

**Option C: Using Python 3 explicitly**
```bash
python3 app.py
```

---

### Step 4: Verify Backend is Running

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

---

### Step 5: Test Backend in Browser

**Open:** `http://localhost:5000`

**Should see:**
```json
{"message": "Caregiver Alert System API", "status": "running"}
```

✅ **If you see this, backend is working!**

---

### Step 6: Check Dashboard Again

**Go back to your dashboard** (refresh the page)

**Should now show:**
```
✅ Connected to Watchful System
Last update: [current time]
API: http://localhost:5000
```

---

## 🐛 Common Issues

### Issue 1: "python: command not found"

**Solution:**
- Try `python3` instead of `python`
- Or install Python if you don't have it

**Check if Python is installed:**
```bash
python3 --version
```

**Should show:** `Python 3.x.x`

---

### Issue 2: "Module not found: fastapi" or "Module not found: uvicorn"

**Solution: Install dependencies**

```bash
cd /Users/riddhi/Documents/GitHub/watchful
pip install -r requirements.txt
```

**OR install manually:**
```bash
pip install fastapi uvicorn python-dotenv firebase-admin geopy
```

---

### Issue 3: "Port 5000 already in use"

**Solution: Find and kill the process**

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

**OR use a different port:**

Edit `app.py` (last line):
```python
uvicorn.run(app, host="0.0.0.0", port=8000)  # Changed to 8000
```

Then update `config/api.js` in watchful:
```javascript
return `http://${window.location.hostname}:8000`;
```

---

### Issue 4: Backend starts but dashboard still shows disconnected

**Check:**
1. Is backend actually running? (Check terminal)
2. Can you access `http://localhost:5000` in browser?
3. Check browser console (F12) for errors
4. Make sure dashboard config uses port 5000

**Test connection manually:**
```bash
curl http://localhost:5000/
```

**Should return:** `{"message": "Caregiver Alert System API", "status": "running"}`

---

## ✅ Quick Checklist

- [ ] Backend terminal is open and running
- [ ] Terminal shows "Uvicorn running on http://0.0.0.0:5000"
- [ ] Browser `http://localhost:5000` shows JSON response
- [ ] Dashboard refreshed (F5 or click Refresh)
- [ ] Dashboard now shows "✅ Connected"

---

## 🎯 What Should Happen

**Before:**
```
❌ Disconnected
Never updated
API: http://localhost:5000
```

**After (when backend is running):**
```
✅ Connected to Watchful System
Last update: 10:30:45 AM
API: http://localhost:5000
```

---

## 📝 Keep Backend Running

**Important:** The backend must stay running for the dashboard to work!

- **Don't close the terminal** where backend is running
- **Don't press Ctrl+C** in that terminal
- If you close it, dashboard will show "Disconnected" again

**To stop backend:**
- Press `Ctrl+C` in the terminal
- Or close the terminal window

---

## 🔄 Complete Setup (All 3 Parts)

**Terminal 1 - Backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python app.py
```
✅ Keep this running!

**Terminal 2 - Dashboard (if using Next.js):**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```
✅ Keep this running too!

**Browser - Dashboard:**
- Open `http://localhost:3000` (or whatever port Next.js uses)
- Should show "✅ Connected"

**Browser - Motion-Patient:**
- Open `motion-patient-main/index.html`
- Should show "✅ Connected to watchful backend"

---

## 🆘 Still Not Working?

**Check these:**

1. **Backend terminal output** - Any error messages?
2. **Browser console** (F12) - Any errors?
3. **Network tab** (F12 → Network) - Is request to `localhost:5000` failing?
4. **Firewall** - Is port 5000 blocked?

**Share these details:**
- What you see in backend terminal
- What you see in browser console
- What happens when you visit `http://localhost:5000` directly
