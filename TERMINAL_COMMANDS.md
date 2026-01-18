# 🖥️ Exact Terminal Commands to Run Everything

## 📋 Step-by-Step Commands (Copy & Paste)

---

## Step 1: Start the Backend Server

**Open Terminal 1:**

```bash
cd /Users/riddhi/Documents/GitHub/watchful
```

```bash
python app.py
```

**OR if that doesn't work:**

```bash
python3 app.py
```

**✅ You should see:**
```
INFO:     Uvicorn running on http://0.0.0.0:5000 (Press CTRL+C to quit)
```

**⚠️ KEEP THIS TERMINAL OPEN!** Don't close it or press Ctrl+C.

---

## Step 2: Test Backend is Working

**Open a NEW browser tab/window:**

Go to: `http://localhost:5000`

**✅ Should see:**
```json
{"message": "Caregiver Alert System API", "status": "running"}
```

If you see this, backend is working! ✅

---

## Step 3: Start the Dashboard (If Using Next.js)

**Open Terminal 2 (NEW terminal window):**

```bash
cd /Users/riddhi/Documents/GitHub/watchful
```

```bash
npm run dev
```

**OR if that doesn't work:**

```bash
npm start
```

**✅ You should see:**
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

**⚠️ KEEP THIS TERMINAL OPEN TOO!**

---

## Step 4: Open Dashboard in Browser

**Open browser and go to:**
```
http://localhost:3000
```

**✅ Should see:**
- Caregiver Dashboard
- "✅ Connected to Watchful System" (if backend is running)
- OR "❌ Disconnected" (if backend is NOT running)

**If still disconnected:**
- Make sure Terminal 1 (backend) is still running
- Refresh the dashboard page (F5)

---

## Step 5: Open Motion-Patient App

**Option A: Direct file open**
- Navigate to: `/Users/riddhi/Downloads/motion-patient-main/index.html`
- Double-click to open in browser

**Option B: Using a simple web server (better for testing)**

**Open Terminal 3 (NEW terminal window):**

```bash
cd /Users/riddhi/Downloads/motion-patient-main
```

```bash
python -m http.server 8080
```

**OR if that doesn't work:**

```bash
python3 -m http.server 8080
```

**Then open browser:**
```
http://localhost:8080
```

**✅ Should see:**
- Motion-Patient app
- Console shows: "✅ Connected to watchful backend" (if backend is running)

---

## 🧪 Test the Complete Flow

**1. In Motion-Patient app:**
- Click "Enable Motion" button
- Grant permissions

**2. Simulate a fall:**
- Shake your device hard
- OR open browser console (F12) and run:
```javascript
window.dispatchEvent(new DeviceMotionEvent('devicemotion', {
  accelerationIncludingGravity: { x: 0, y: 0, z: 30 }
}))
```

**3. Check Motion-Patient console:**
- Should see: `✅ Fall alert sent to watchful backend`

**4. Check Backend Terminal (Terminal 1):**
- Should see: `Demo mode: Alert created - fall for patient patient_demo`

**5. Check Dashboard:**
- Click "Refresh" button
- OR wait 30 seconds
- Should see new alert in "Active Alerts" section

---

## 📊 Summary: What Should Be Running

**Terminal 1:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python app.py
```
✅ Backend running on port 5000

**Terminal 2:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```
✅ Dashboard running on port 3000

**Terminal 3 (Optional):**
```bash
cd /Users/riddhi/Downloads/motion-patient-main
python -m http.server 8080
```
✅ Motion-Patient app on port 8080

**Browser Tabs:**
- `http://localhost:5000` - Backend API (test)
- `http://localhost:3000` - Dashboard
- `http://localhost:8080` - Motion-Patient app

---

## 🛑 To Stop Everything

**Terminal 1 (Backend):**
- Press `Ctrl+C`
- Type: `exit`

**Terminal 2 (Dashboard):**
- Press `Ctrl+C`
- Type: `exit`

**Terminal 3 (Motion-Patient server):**
- Press `Ctrl+C`
- Type: `exit`

---

## 🐛 Troubleshooting Commands

### Check if Python is installed:
```bash
python3 --version
```

### Check if Node/npm is installed:
```bash
npm --version
```

### Check if port 5000 is in use:
```bash
lsof -i :5000
```

### Kill process on port 5000:
```bash
lsof -ti:5000 | xargs kill -9
```

### Install Python dependencies (if needed):
```bash
cd /Users/riddhi/Documents/GitHub/watchful
pip install -r requirements.txt
```

### Install Node dependencies (if needed):
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm install
```

### Test backend connection:
```bash
curl http://localhost:5000/
```

---

## ✅ Quick Verification Checklist

Run these commands to verify everything:

**1. Check backend:**
```bash
curl http://localhost:5000/
```
Should return: `{"message": "Caregiver Alert System API", "status": "running"}`

**2. Check dashboard:**
- Open: `http://localhost:3000`
- Should show dashboard (not error page)

**3. Check motion-patient:**
- Open: `http://localhost:8080`
- Should show motion-patient app
- Console should show: `✅ Connected to watchful backend`

---

## 🎯 One-Liner Setup (All at Once)

**If you want to start everything in one go, open 3 terminals:**

**Terminal 1:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful && python app.py
```

**Terminal 2:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful && npm run dev
```

**Terminal 3:**
```bash
cd /Users/riddhi/Downloads/motion-patient-main && python -m http.server 8080
```

---

## 📝 Notes

- **Backend MUST be running** for dashboard and motion-patient to work
- **Keep all terminals open** while using the system
- **Dashboard refreshes every 30 seconds** automatically
- **Motion-patient sends alerts immediately** when fall detected

---

That's it! Copy and paste these commands exactly as shown! 🚀
