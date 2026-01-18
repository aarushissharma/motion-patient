# 🚀 Quick Setup: Connect Deployed App to Dashboard

## 🎯 Goal
Connect: **https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/**
To your watchful dashboard so when phone drops → shows "fall detected"

---

## ✅ 3-Step Quick Setup

### Step 1: Start Backend & ngrok

**Terminal 1 - Backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Terminal 2 - ngrok:**
```bash
ngrok http 5001
```

**Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

### Step 2: Access Deployed App with ngrok URL

**Open this URL in browser:**
```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://abc123.ngrok.io
```

*(Replace `https://abc123.ngrok.io` with your actual ngrok URL)*

### Step 3: Test It!

1. **Open the deployed app** (with ngrok URL in parameter)
2. **Check connection** - should show "✅ Connected"
3. **Drop phone** or shake device
4. **Check dashboard** - should show "Fall detected"!

---

## 🎯 That's It!

**Flow:**
```
Deployed App → ngrok → Your Backend → Dashboard
Phone Drops → Fall Detected → Alert in Dashboard
```

---

## 📝 Notes

- **ngrok URL changes** each time you restart ngrok
- **Update the URL parameter** when ngrok restarts
- **Keep both terminals running** (backend + ngrok)

---

## 🆘 If It Doesn't Work

1. **Check backend is running:** `http://localhost:5001`
2. **Check ngrok is running:** Should show forwarding URL
3. **Check deployed app console:** Open F12, look for errors
4. **Check dashboard:** Should be running on port 3000

---

**Ready to test!** 🚀
