# 🌐 Connect Deployed Vercel App to Caregiver Dashboard

## Overview

Connect your deployed app at:
**https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/**

To your local caregiver dashboard so you can see:
- ✅ Real-time magnitude changes
- ✅ Fall detections
- ✅ Motion data updates

---

## Step 1: Install & Start ngrok

**ngrok** exposes your local backend to the internet so the deployed app can reach it.

### Install ngrok (if not installed):

**Mac:**
```bash
brew install ngrok
```

**Or download from:** https://ngrok.com/download

### Start ngrok:

```bash
ngrok http 5001
```

You'll see something like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5001
```

**Copy the `https://` URL** (e.g., `https://abc123.ngrok.io`)

---

## Step 2: Configure Deployed App

The deployed app needs to know where to send data. Since we can't modify Vercel directly, we'll use URL parameters.

### Access the deployed app with ngrok URL:

```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://YOUR_NGROK_URL
```

**Replace `YOUR_NGROK_URL` with your ngrok URL** (e.g., `abc123.ngrok.io`)

**Example:**
```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://abc123.ngrok.io
```

---

## Step 3: Make Sure Backend is Running

```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

Should show: `Uvicorn running on http://0.0.0.0:5001`

---

## Step 4: Make Sure Dashboard is Running

```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```

Should show: `Ready on http://localhost:3000`

---

## Step 5: Test the Connection

1. **Open the deployed app** with ngrok URL:
   ```
   https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://YOUR_NGROK_URL
   ```

2. **Check connection status** - should show "✅ Connected"

3. **Enable Motion** (if on a device that supports it)

4. **Move the device** or simulate motion

5. **Check dashboard** at `http://localhost:3000`:
   - Should see motion data in "Patient Motion Data & Fall History" section
   - Magnitude values should update
   - Falls should appear in fall history

---

## What You'll See

### On Deployed App:
- Connection status
- Motion data (magnitude, event type)
- Fall events

### On Dashboard (http://localhost:3000):
- **Patient Motion Data & Fall History** section
- Current motion status (NORMAL/SLOW DESCENT/FALL)
- Real-time magnitude updates
- Fall history with timestamps

---

## Important Notes

1. **ngrok must stay running** - Keep the ngrok terminal open
2. **Backend must stay running** - Keep `python3 app.py` running
3. **Dashboard must stay running** - Keep `npm run dev` running
4. **ngrok URL changes** - Free ngrok URLs change each time you restart. For permanent URL, upgrade to paid plan or use a custom domain

---

## Troubleshooting

**Deployed app shows "Disconnected":**
- Check ngrok is running: Should show "Forwarding https://..."
- Check backend is running: Should show "Uvicorn running on http://0.0.0.0:5001"
- Verify ngrok URL is correct in the deployed app URL

**Dashboard not showing data:**
- Check dashboard is running: `npm run dev`
- Check backend is receiving requests (check backend terminal for logs)
- Wait 2-5 seconds for data to appear (dashboard polls every 2 seconds)

**ngrok not working:**
- Make sure backend is running first
- Check firewall isn't blocking ngrok
- Try restarting ngrok

---

## Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python3 app.py
```

**Terminal 2 - ngrok:**
```bash
ngrok http 5001
```

**Terminal 3 - Dashboard:**
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```

**Then open:**
```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://YOUR_NGROK_URL
```

---

## ✅ Success Checklist

- [ ] ngrok running and showing forwarding URL
- [ ] Backend running on port 5001
- [ ] Dashboard running on port 3000
- [ ] Deployed app accessed with `?api_url=` parameter
- [ ] Deployed app shows "✅ Connected"
- [ ] Dashboard shows motion data updates
- [ ] Falls appear in dashboard when detected
