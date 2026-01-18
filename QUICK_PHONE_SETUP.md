# 📱 Quick Phone Connection Guide

## ✅ Your Backend & Dashboard Are Running!

- ✅ Backend: Running on port 5001
- ✅ Dashboard: Running on port 3000

## 🔗 Connect Your Phone (2 Options)

### Option 1: Same WiFi (Easiest)

**Step 1: Find Your Computer's IP**

Open Terminal on your Mac and run:
```bash
ipconfig getifaddr en0
```

If that doesn't work, try:
```bash
ipconfig getifaddr en1
```

You'll get something like: `192.168.1.100`

**Step 2: Open on Your Phone**

On your phone's browser, go to:
```
http://YOUR_IP:5001
```

Replace `YOUR_IP` with the number from Step 1.

**Step 3: Configure API URL**

Add this to the URL:
```
http://YOUR_IP:5001?api_url=http://YOUR_IP:5001
```

**Step 4: Enable Motion**

1. Click "Enable Motion" button
2. Allow permissions
3. Move your phone!

**Step 5: View Dashboard**

On your computer, open:
```
http://localhost:3000
```

---

### Option 2: Use ngrok (Works from Anywhere)

**Step 1: Start ngrok**

In Terminal:
```bash
ngrok http 5001
```

Copy the `https://` URL (e.g., `https://abc123.ngrok.io`)

**Step 2: Open on Phone**

```
https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://YOUR_NGROK_URL
```

Replace `YOUR_NGROK_URL` with your ngrok URL.

**Step 3: Enable Motion & Test**

1. Click "Enable Motion"
2. Move your phone
3. Check `http://localhost:3000` on your computer

---

## 📊 What You'll See

### On Phone:
- Magnitude: [number]
- Event: NORMAL / SLOW DESCENT / FALL
- Fall Events list

### On Dashboard (http://localhost:3000):
- **Patient Motion Data & Fall History** section
- Current Status (color-coded)
- Magnitude values
- Fall history with timestamps

---

## ⚡ Quick Test

1. Open app on phone
2. Click "Enable Motion"
3. Shake/drop your phone
4. Check dashboard at `http://localhost:3000`
5. You should see motion data appear within 2-5 seconds!
