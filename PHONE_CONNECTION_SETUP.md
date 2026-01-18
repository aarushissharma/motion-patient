# 📱 Connect Your Phone to the Dashboard

## Quick Setup (Choose One Method)

### Method 1: Same WiFi Network (Easiest - No ngrok needed)

**Step 1: Find Your Computer's Local IP Address**

On your Mac, open Terminal and run:
```bash
ipconfig getifaddr en0
```
OR
```bash
ipconfig getifaddr en1
```

You'll get something like: `192.168.1.100` or `10.0.0.5`

**Step 2: Access the Motion App on Your Phone**

Open this URL on your phone's browser:
```
http://YOUR_LOCAL_IP:5001
```

Replace `YOUR_LOCAL_IP` with the IP from Step 1.

**Step 3: Configure the App**

When the app loads, it should show the connection status. If it says "Disconnected":

1. Open the browser console (if possible) or
2. Add `?api_url=http://YOUR_LOCAL_IP:5001` to the URL:
   ```
   http://YOUR_LOCAL_IP:5001?api_url=http://YOUR_LOCAL_IP:5001
   ```

**Step 4: Enable Motion Tracking**

1. Click "Enable Motion" button
2. Allow motion permissions
3. Start moving your phone around!

**Step 5: View on Dashboard**

Open on your computer:
```
http://localhost:3000
```

You should see:
- ✅ Current motion status (NORMAL/SLOW DESCENT/FALL)
- 📊 Magnitude values
- ⚠️ Fall history

---

### Method 2: Using ngrok (Works from Anywhere)

**Step 1: Start ngrok**

In a new terminal:
```bash
ngrok http 5001
```

You'll see something like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5001
```

**Step 2: Copy the ngrok URL**

Copy the `https://` URL (e.g., `https://abc123.ngrok.io`)

**Step 3: Access on Your Phone**

Open this URL on your phone:
```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://YOUR_NGROK_URL
```

Replace `YOUR_NGROK_URL` with your ngrok URL (e.g., `abc123.ngrok.io`)

**Step 4: Enable Motion & Test**

1. Click "Enable Motion"
2. Allow permissions
3. Move your phone around
4. Check dashboard at `http://localhost:3000`

---

## ✅ What You Should See

### On Your Phone:
- Magnitude: [number]
- Event: NORMAL / SLOW DESCENT / FALL
- Fall Events: List of falls

### On Dashboard (http://localhost:3000):
- **Patient Motion Data & Fall History** section showing:
  - Current Status: NORMAL (green) / SLOW DESCENT (orange) / FALL (red)
  - Magnitude: [value]
  - Acceleration: X, Y, Z values
  - Fall Events: List with timestamps

---

## 🔧 Troubleshooting

**Phone shows "Disconnected":**
- Make sure backend is running: `python3 app.py` in `/Users/riddhi/Documents/GitHub/watchful`
- Check the API URL in the app matches your backend URL
- Try refreshing the page

**Dashboard not showing data:**
- Make sure dashboard is running: `npm run dev` in `/Users/riddhi/Documents/GitHub/watchful`
- Check dashboard at `http://localhost:3000`
- Wait 2-3 seconds for data to appear (updates every 2 seconds)

**Motion not detected:**
- Make sure you clicked "Enable Motion" and granted permissions
- Try shaking/dropping your phone more aggressively
- Check browser console for errors

---

## 📊 Real-Time Updates

- Motion data updates every **5 seconds** from phone to backend
- Dashboard refreshes every **2 seconds** to show latest data
- Fall alerts are sent **immediately** when detected
