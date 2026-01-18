# Motion Patient Main - Direct Connection Setup

This app now includes a local server that motion-main can connect to directly, without needing the Watchful backend.

## 🚀 Quick Start

### 1. Start the Motion Patient Server

```bash
cd /Users/riddhi/Downloads/motion-patient-main
node server.js
```

The server will start on **port 3001** and you'll see:
```
🚀 Motion Patient Server running on http://localhost:3001
📡 API available at http://localhost:3001/api/
```

### 2. Open the Patient App

Open `index.html` in a browser. The app will:
- Detect falls using device motion
- Send fall data to the local server (port 3001)
- Also try to send to Watchful backend if it's running (optional)

### 3. Start Motion Main App

In a separate terminal:
```bash
cd /Users/riddhi/Downloads/motion-main
npx expo start
```

The motion-main app is now configured to connect to `http://localhost:3001` (motion-patient-main server).

## 📡 API Endpoints

The local server exposes:

- `GET /api/status` - Server status and patient info
- `GET /api/falls` - Get all fall events
- `POST /api/falls` - Add a fall event
- `GET /api/alerts` - Get alerts (falls formatted as alerts)
- `PUT /api/alerts/:id` - Update alert status
- `GET /api/patient` - Get patient information
- `POST /api/patient` - Update patient information
- `GET /api/motion` - Get motion data
- `POST /api/motion` - Add motion data

## 🔄 How It Works

```
┌─────────────────────┐         ┌─────────────────────┐
│  Motion-Patient    │         │  Motion-Main        │
│  App (Browser)      │         │  (React Native)     │
│                     │         │                     │
│  Detects Falls     │────────►│  Reads Falls        │
│  Sends to Server   │  POST   │  GET /api/alerts    │
│  (Port 3001)       │         │  (Port 3001)        │
└─────────────────────┘         └─────────────────────┘
         │                                │
         └──────────────┬─────────────────┘
                        │
                ┌───────▼────────┐
                │  Local Server  │
                │  (Port 3001)   │
                │                │
                │  Stores:       │
                │  - Falls       │
                │  - Motion Data │
                │  - Patient Info│
                └────────────────┘
```

## ✅ Testing

1. **Test Server**:
   ```bash
   curl http://localhost:3001/api/status
   ```

2. **Test Fall Detection**:
   - Open `index.html` in browser
   - Enable motion permission
   - Shake device to simulate fall
   - Check server terminal - should see "✅ Fall received"

3. **Test Motion Main Connection**:
   - Open motion-main app
   - Should show "Connected to backend" on onboarding
   - Dashboard should show patient status
   - Notifications should show falls

## 🐛 Troubleshooting

### Server won't start
- Make sure port 3001 is not in use
- Check Node.js is installed: `node --version`

### Motion-main can't connect
- Make sure server is running: `curl http://localhost:3001/api/status`
- Check motion-main config points to `http://localhost:3001`

### Falls not appearing
- Check browser console for errors
- Check server terminal for received falls
- Make sure motion permission is granted

## 📝 Notes

- The server stores data in memory (resets on restart)
- Falls are kept for last 100 events
- Motion data is kept for last 1000 events
- Patient status updates automatically based on falls
