# 🔧 Fix ngrok Error: Connection Refused

## ❌ The Problem

ngrok is trying to connect to `http://localhost:80` but your backend is on port **5001**, not port 80.

The error shows:
```
ERR_NGROK_8012: Failed to connect to http://localhost:80
```

---

## ✅ Solution

### Step 1: Make Sure Backend is Running

**Check if backend is running:**
```bash
lsof -ti:5001
```

If nothing shows, **start the backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Should see:**
```
Uvicorn running on http://0.0.0.0:5001
```

### Step 2: Test Backend Locally

**Test that backend works:**
```bash
curl http://localhost:5001
```

**Should see:**
```json
{"message":"Caregiver Alert System API","status":"running"}
```

### Step 3: Restart ngrok

**Stop ngrok** (Ctrl+C in the ngrok terminal)

**Start ngrok again:**
```bash
ngrok http 5001
```

**Make sure it says:**
```
Forwarding  https://...ngrok-free.app -> http://localhost:5001
```

**NOT** `http://localhost:80`!

---

## 🔍 Why This Happened

Possible causes:
1. Backend wasn't running when ngrok started
2. ngrok command was wrong (should be `ngrok http 5001`)
3. Port 5001 was already in use

---

## ✅ Quick Fix Checklist

- [ ] Backend is running: `python3 app.py` shows `Uvicorn running on http://0.0.0.0:5001`
- [ ] Backend responds: `curl http://localhost:5001` returns JSON
- [ ] ngrok restarted: `ngrok http 5001` (not port 80)
- [ ] ngrok shows forwarding to `localhost:5001` (not 80)
- [ ] Test ngrok URL in browser - should see backend response

---

## 🧪 Test After Fix

1. **Restart backend** (if not running)
2. **Restart ngrok** with `ngrok http 5001`
3. **Open ngrok URL** in browser - should see backend JSON response
4. **Then connect deployed app** with ngrok URL

---

## 💡 If Still Not Working

**Check what's on port 5001:**
```bash
lsof -i :5001
```

**Kill any process blocking it:**
```bash
kill -9 $(lsof -ti:5001)
```

**Then restart backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```
