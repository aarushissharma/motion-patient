# 🚀 How to Start the Caregiver Dashboard

## ❌ Problem
"This site can't be reached" when trying to access the caregiver dashboard.

## ✅ Solution: Start the Dashboard Server

The caregiver dashboard is a **separate application** (Next.js) that needs to be started in a **different terminal window**.

---

## 📋 Step-by-Step Instructions

### Step 1: Open a NEW Terminal Window

**Important:** Keep your backend terminal running! Open a **second terminal window**.

- **Mac:** Press `Cmd + T` in Terminal (or open a new Terminal window)
- **Or:** Press `Cmd + Space`, type "Terminal", press Enter

---

### Step 2: Navigate to Watchful Directory

```bash
cd /Users/riddhi/Documents/GitHub/watchful
```

---

### Step 3: Check if Node.js/npm is Installed

```bash
npm --version
```

**If you see a version number:** ✅ npm is installed, continue to Step 4

**If you see "command not found":**
- Install Node.js from: https://nodejs.org/
- Or use Homebrew: `brew install node`

---

### Step 4: Install Dependencies (First Time Only)

**If this is your first time starting the dashboard:**

```bash
npm install
```

This will install all required packages. **Wait for it to finish** (may take 1-2 minutes).

---

### Step 5: Start the Dashboard

```bash
npm run dev
```

**OR if that doesn't work:**

```bash
npm start
```

---

### Step 6: Look for Success Message

**You should see output like:**

```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

**OR:**

```
> watchful@1.0.0 dev
> next dev

- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

✅ **If you see this, dashboard is starting!**

---

### Step 7: Open Dashboard in Browser

**Open your browser and go to:**
```
http://localhost:3000
```

**You should see:**
- Caregiver Dashboard interface
- "✅ Connected to Watchful System" (if backend is running on port 5001)
- OR "❌ Disconnected" (if backend is not running)

---

## ⚠️ Important Notes

### Keep Both Terminals Running
- **Terminal 1:** Backend server (port 5001) - **KEEP RUNNING**
- **Terminal 2:** Dashboard server (port 3000) - **KEEP RUNNING**

**Don't close either terminal!** Both must stay running.

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js
- Download from: https://nodejs.org/
- Or use Homebrew: `brew install node`

### Problem: "Error: Cannot find module"
**Solution:** Install dependencies
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm install
```

### Problem: "Port 3000 already in use"
**Solution 1: Kill the process using port 3000**
```bash
lsof -ti:3000 | xargs kill -9
```

**Solution 2: Use a different port**
```bash
npm run dev -- -p 3001
```
Then access: `http://localhost:3001`

### Problem: Dashboard shows "Disconnected"
**Check:**
1. Is backend terminal still running? (Check Terminal 1)
2. Is backend running on port 5001? (Check backend terminal output)
3. Refresh dashboard page (F5)
4. Check browser console (F12) for errors

**Note:** Dashboard needs to be configured to connect to port 5001 (not 5000). See configuration section below.

---

## 🔧 Dashboard Configuration

The dashboard needs to know where the backend is. Make sure it's configured for port **5001** (since your backend is running on 5001).

**Check/Edit:** `/Users/riddhi/Documents/GitHub/watchful/config/api.js`

**Should be:**
```javascript
export const API_BASE_URL = 'http://localhost:5001';
```

**OR:**
```javascript
return `http://${window.location.hostname}:5001`;
```

---

## ✅ Quick Checklist

- [ ] Backend terminal is open and running (port 5001)
- [ ] Dashboard terminal is open and running (port 3000)
- [ ] Browser `http://localhost:3000` shows dashboard
- [ ] Dashboard shows "✅ Connected" (if backend is running)

---

## 📝 Summary

**You need 2 terminals running:**

**Terminal 1 - Backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
# Should show: Uvicorn running on http://0.0.0.0:5001
```

**Terminal 2 - Dashboard:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
# Should show: ready started server on 0.0.0.0:3000
```

**Then open:**
- Dashboard: `http://localhost:3000`
- Motion-Patient: Already working! ✅

---

## 🎯 What You Should See

### In Browser (Dashboard):
- Caregiver Dashboard interface
- "✅ Connected to Watchful System"
- Alert lists and statistics

### In Terminal 2 (Dashboard):
- Server running on port 3000
- No errors

### In Terminal 1 (Backend):
- Server running on port 5001
- Ready to receive alerts

---

## 🆘 Still Not Working?

1. **Check both terminals are running**
2. **Check ports:**
   - Backend: `http://localhost:5001` should show JSON
   - Dashboard: `http://localhost:3000` should show dashboard
3. **Check browser console (F12)** for errors
4. **Make sure dashboard config points to port 5001**

That's it! 🚀
