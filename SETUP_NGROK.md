# 🌐 Setup ngrok to Connect Deployed App

## 🎯 Goal
Make your local backend (localhost:5001) accessible from the internet so the deployed motion-patient app can connect to it.

---

## ✅ Quick Setup (5 Steps)

### Step 1: Install ngrok

**Mac (using Homebrew):**
```bash
brew install ngrok
```

**OR download from:**
- https://ngrok.com/download
- Sign up for free account (required)

### Step 2: Start Your Backend

**Make sure backend is running:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Should see:**
```
INFO:     Uvicorn running on http://0.0.0.0:5001
```

### Step 3: Start ngrok

**Open a NEW terminal window:**

```bash
ngrok http 5001
```

**You'll see:**
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5001
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

### Step 4: Update Deployed App

**Option A: Via URL Parameter (Easiest - No Code Changes)**

Access your deployed app with the ngrok URL as a parameter:

```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://abc123.ngrok.io
```

**Option B: Update Vercel Environment Variables**

1. Go to: https://vercel.com/dashboard
2. Find your motion-patient project
3. Settings → Environment Variables
4. Add: `NEXT_PUBLIC_API_URL` = `https://abc123.ngrok.io`
5. Redeploy

### Step 5: Test Connection

1. **Open deployed app** (with ngrok URL)
2. **Check connection status** - should show "✅ Connected"
3. **Drop phone** - should detect fall
4. **Check dashboard** - should show alert!

---

## ⚠️ Important Notes

### ngrok Free Tier Limitations
- URL changes every time you restart ngrok
- You'll need to update the deployed app with new URL
- Consider ngrok paid plan for static URL

### Keep ngrok Running
- **Don't close the ngrok terminal** - it must stay running
- If you restart ngrok, you'll get a new URL
- Update deployed app with new URL

### Alternative: Deploy Backend
For production, consider deploying the backend to:
- Heroku
- Railway
- Render
- AWS/GCP/Azure

This gives you a permanent URL instead of ngrok.

---

## 🧪 Quick Test

1. **Backend running:** `python3 app.py` ✅
2. **ngrok running:** `ngrok http 5001` ✅
3. **Copy ngrok URL:** `https://abc123.ngrok.io` ✅
4. **Open deployed app with URL:** 
   ```
   https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://abc123.ngrok.io
   ```
5. **Drop phone** → Should show "Fall detected" in dashboard!

---

## 📝 Summary

**What you need:**
- Backend running on port 5001
- ngrok exposing port 5001
- Deployed app configured to use ngrok URL

**Result:**
- Deployed app → ngrok → Your backend → Dashboard
- When phone drops → Alert appears in dashboard!

That's it! 🚀
