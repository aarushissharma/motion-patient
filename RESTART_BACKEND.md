# 🔄 Restart Backend - Port Already in Use

## ❌ Problem
Backend can't start because port 5001 is already in use (another backend is running).

## ✅ Quick Fix

### Option 1: Kill Existing Backend (Recommended)

**Run this command:**
```bash
kill -9 $(lsof -ti:5001)
```

**Then start backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

### Option 2: Find and Kill Manually

**Find the process:**
```bash
lsof -ti:5001
```

**Kill it (replace PID with the number from above):**
```bash
kill -9 PID
```

**Then start backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

---

## ✅ After Restart

**You should see:**
```
Uvicorn running on http://0.0.0.0:5001
```

**Then test:**
1. Drop phone on deployed app
2. Check backend terminal - should see "Motion data received"
3. Check dashboard - should see fall data!
