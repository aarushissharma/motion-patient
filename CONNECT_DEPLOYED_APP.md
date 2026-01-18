# 🌐 Connect Deployed Motion-Patient App to Dashboard

## 🎯 Goal
Connect the deployed motion-patient app at:
**https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/**

To the watchful caregiver dashboard so when a patient drops their phone, it shows "fall detected" in the dashboard.

---

## ⚠️ Challenge
The deployed app is on the internet, but your backend is on `localhost:5001` (only accessible on your computer).

**Solution:** Make your backend accessible from the internet using ngrok or similar service.

---

## ✅ Step-by-Step Setup

### Step 1: Make Backend Accessible from Internet

**Option A: Using ngrok (Recommended - Free)**

1. **Install ngrok:**
   ```bash
   brew install ngrok
   # OR download from: https://ngrok.com/download
   ```

2. **Start your backend** (if not already running):
   ```bash
   cd /Users/riddhi/Documents/GitHub/watchful
   python3 app.py
   ```

3. **In a NEW terminal, expose backend with ngrok:**
   ```bash
   ngrok http 5001
   ```

4. **Copy the ngrok URL:**
   - You'll see something like: `https://abc123.ngrok.io`
   - Copy this URL (it's your public backend URL)

**Option B: Deploy Backend to Cloud**
- Deploy to Heroku, Railway, Render, or similar
- Get the public URL
- Use that instead of ngrok

---

### Step 2: Update Deployed Motion-Patient App

Since the app is deployed on Vercel, you need to update its configuration.

**Option A: Update via Environment Variables (Best)**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Find your motion-patient project
   - Go to Settings → Environment Variables

2. **Add environment variable:**
   - Name: `NEXT_PUBLIC_API_URL` or `VITE_API_URL`
   - Value: Your ngrok URL (e.g., `https://abc123.ngrok.io`)
   - Redeploy the app

**Option B: Update Config in Code (If you have access)**

1. **Update the config file** in your Vercel project:
   - Find `js/config.js` or similar
   - Change: `API_BASE_URL: 'http://localhost:5001'`
   - To: `API_BASE_URL: 'YOUR_NGROK_URL'`
   - Redeploy

**Option C: Use URL Parameters (Quick Fix)**

Add this to your deployed app's code to accept API URL from URL parameter:

```javascript
// In config.js - add this at the top
const urlParams = new URLSearchParams(window.location.search);
const apiUrlFromUrl = urlParams.get('api_url');

if (apiUrlFromUrl) {
  WATCHFUL_CONFIG.API_BASE_URL = apiUrlFromUrl;
  localStorage.setItem('watchful_api_url', apiUrlFromUrl);
}
```

Then access the deployed app with:
```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://abc123.ngrok.io
```

---

### Step 3: Update Backend CORS (If Needed)

Your backend already has CORS enabled with `allow_origins=["*"]`, so it should work. But verify:

**File:** `/Users/riddhi/Documents/GitHub/watchful/app.py`

Should have:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### Step 4: Test the Connection

1. **Open deployed app:**
   - https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/

2. **Open browser console** (F12)

3. **Check connection:**
   - Should see: `✅ Connected to watchful backend`
   - Or check the connection status in the UI

4. **Test fall detection:**
   - Drop phone or shake device
   - Should see: "Fall detected" in the app
   - Check dashboard - should show alert

---

## 🔧 Quick Setup Script

I'll create a helper script to make this easier. But for now, here's what you need:

1. **Backend running:** `python3 app.py` (port 5001)
2. **ngrok running:** `ngrok http 5001` (get public URL)
3. **Update deployed app:** Point to ngrok URL
4. **Dashboard running:** `npm run dev` (port 3000)

---

## 📝 Configuration Summary

**Deployed Motion-Patient App:**
- URL: `https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/`
- API URL: Should point to ngrok URL (e.g., `https://abc123.ngrok.io`)

**Backend:**
- Local: `http://localhost:5001`
- Public (via ngrok): `https://abc123.ngrok.io`

**Dashboard:**
- URL: `http://localhost:3000`
- API URL: `http://localhost:5001` (can stay local)

---

## 🧪 Test Flow

1. **Drop phone** → Motion-patient app detects fall
2. **Sends alert** → To ngrok URL → To your backend
3. **Backend receives** → Stores alert
4. **Dashboard fetches** → Shows "Fall detected X minutes ago"

---

## 🆘 Troubleshooting

### Deployed app can't connect
- Check ngrok is running
- Check backend is running on port 5001
- Check ngrok URL is correct in deployed app config
- Check browser console for CORS errors

### Dashboard doesn't show alerts
- Check backend is receiving alerts (check backend terminal)
- Check dashboard is polling (every 2 seconds)
- Refresh dashboard page

---

## 🎯 Next Steps

1. **Set up ngrok** to expose backend
2. **Update deployed app** to use ngrok URL
3. **Test connection** from deployed app
4. **Drop phone** and watch dashboard show alert!

Let me know if you need help with any step! 🚀
