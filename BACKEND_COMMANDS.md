# 🖥️ Backend Terminal Commands

## Step-by-Step Commands

### Step 1: Kill Existing Backend (if port is in use)

```bash
kill -9 $(lsof -ti:5001) 2>/dev/null
```

### Step 2: Navigate to Backend Directory

```bash
cd /Users/riddhi/Documents/GitHub/watchful
```

### Step 3: Start Backend

```bash
python3 app.py
```

---

## ✅ What You Should See

After running `python3 app.py`, you should see:

```
Firebase credentials not found, running in demo mode
INFO:     Started server process [XXXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:5001 (Press CTRL+C to quit)
```

**Keep this terminal open!** The backend must stay running.

---

## 🛑 To Stop Backend

Press: `Ctrl+C`

---

## 📋 Complete Command Sequence

**Copy and paste this entire block:**

```bash
kill -9 $(lsof -ti:5001) 2>/dev/null
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

---

## ✅ Quick Checklist

After backend starts:
- [ ] Shows "Uvicorn running on http://0.0.0.0:5001"
- [ ] No errors
- [ ] Terminal stays open (don't close it!)

Then test:
1. Drop phone on deployed app
2. Check this terminal - should see "Motion data received"
3. Check dashboard - should see fall data!
