# 📊 Visual Guide - How Everything Connects

## 🏗️ The Architecture (Simple View)

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR COMPUTER                             │
│                                                               │
│  ┌──────────────────────┐      ┌──────────────────────┐    │
│  │  Motion-Patient App  │      │  Watchful Backend    │    │
│  │  (Frontend)          │      │  (Backend Server)     │    │
│  │                      │      │                      │    │
│  │  - Detects falls     │      │  - Receives alerts   │    │
│  │  - Shows on screen   │◄─────┤  - Saves to database │    │
│  │  - Sends alerts ────┼──────►│  - Sends notifs      │    │
│  │                      │      │                      │    │
│  └──────────────────────┘      └──────────────────────┘    │
│         │                              │                     │
│         │                              │                     │
│         └────────── Browser ───────────┘                     │
│                    (localhost:5000)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
motion-patient-main/
│
├── index.html          ← Main page (loads everything)
│
├── js/
│   ├── config.js       ← Settings (where to send, which patient)
│   ├── api.js          ← Messenger (sends data to watchful)
│   ├── movement.js     ← Motion detector (detects falls)
│   └── main.js         ← Coordinator (ties everything together)
│
├── styles.css          ← Makes it look pretty
│
└── EXPLANATION.md      ← This detailed guide
```

---

## 🔄 The Complete Flow (Step by Step)

### When Everything Works:

```
┌─────────────┐
│   DEVICE    │  Patient's phone/tablet
│ Accelerometer│  Detects movement
└──────┬──────┘
       │
       │ "Movement detected!"
       ▼
┌─────────────┐
│ movement.js │  Calculates: Is this a fall?
│             │  Checks magnitude, thresholds
└──────┬──────┘
       │
       │ "Yes! FALL detected!"
       ▼
┌─────────────┐
│  main.js    │  Receives: { eventType: "FALL", ... }
│             │  Shows red alert on screen
│             │  Logs to fall log
└──────┬──────┘
       │
       │ Calls: sendFallAlertToWatchful(data)
       ▼
┌─────────────┐
│   api.js    │  Step 1: Get location
│             │  └─> navigator.geolocation
│             │      Returns: { lat: 37.7, lng: -122.4 }
│             │
│             │  Step 2: Package data
│             │  └─> Creates JSON:
│             │      {
│             │        patient_id: "patient_demo",
│             │        alert_type: "fall",
│             │        severity: "high",
│             │        location: { lat: 37.7, lng: -122.4 },
│             │        timestamp: "2024-01-15T10:30:00Z",
│             │        message: "Fall detected..."
│             │      }
│             │
│             │  Step 3: Send HTTP POST
│             │  └─> fetch('http://localhost:5000/api/alerts', {
│             │        method: 'POST',
│             │        body: JSON.stringify(data)
│             │      })
└──────┬──────┘
       │
       │ HTTP Request
       ▼
┌─────────────┐
│   WATCHFUL  │  Receives POST request
│   BACKEND   │  at /api/alerts
│             │
│             │  Step 1: Validate data
│             │  Step 2: Save to database
│             │  Step 3: Send notifications
│             │  Step 4: Return success
└──────┬──────┘
       │
       │ HTTP Response: { "message": "Alert created", "alert_id": "..." }
       ▼
┌─────────────┐
│   api.js    │  Receives response
│             │  Returns: { success: true, data: {...} }
└──────┬──────┘
       │
       │ Returns success
       ▼
┌─────────────┐
│  main.js    │  Updates UI
│             │  Shows: "✓ Sent" next to fall
│             │  Console: "✅ Fall alert sent"
└─────────────┘
```

---

## 🎯 The Connection Point

```
Motion-Patient App                    Watchful Backend
──────────────────                    ────────────────

js/api.js                             app.py
│                                      │
│  fetch(                              │  @app.post("/api/alerts")
│    'http://localhost:5000/api/alerts'│  async def create_alert(alert: Alert)
│    { method: 'POST', ... }            │    # Receives alert
│  )                                    │    # Saves to database
│                                      │    # Returns success
│                                      │
└──────────────────────────────────────┘
         HTTP POST Request
         (JSON data)
```

---

## 🔌 Configuration Flow

```
┌─────────────────┐
│  config.js      │  Default settings
│                 │  API_BASE_URL: 'http://localhost:5000'
│                 │  PATIENT_ID: 'patient_demo'
└────────┬────────┘
         │
         │ getWatchfulApiUrl()
         │ getPatientId()
         ▼
┌─────────────────┐
│  api.js         │  Uses these settings
│                 │  to know where to send
└─────────────────┘
```

**OR** (if user customized):

```
Browser localStorage
│
│ localStorage.getItem('watchful_api_url')
│ localStorage.getItem('watchful_patient_id')
▼
┌─────────────────┐
│  api.js         │  Uses custom settings
└─────────────────┘
```

---

## 📦 Data Package (What Gets Sent)

### Input (from movement.js):
```javascript
{
  ax: 10.5,           // Acceleration X
  ay: 5.2,            // Acceleration Y
  az: 20.8,           // Acceleration Z
  magnitude: 25.3,   // Total force
  eventType: "FALL"   // Type of event
}
```

### After Processing (what api.js sends):
```javascript
{
  patient_id: "patient_demo",
  alert_type: "fall",
  severity: "high",
  location: {
    lat: 37.7749,
    lng: -122.4194,
    address: "Location detected"
  },
  timestamp: "2024-01-15T10:30:00.000Z",
  message: "Fall detected with magnitude 25.30. Acceleration: X=10.50, Y=5.20, Z=20.80",
  status: "active"
}
```

---

## 🎨 UI Updates Flow

```
Fall Detected
     │
     ├─► Status turns RED
     │
     ├─► Fall log shows: "⚠️ Fall at 10:30:45 (mag 25.30)"
     │
     └─► After sending:
         ├─► Success: "⚠️ Fall at 10:30:45 (mag 25.30) ✓ Sent"
         └─► Failure: "⚠️ Fall at 10:30:45 (mag 25.30) ✗ Failed"
```

---

## 🔍 Debugging Flow

### Check Connection:
```
Page Loads
    │
    └─► testWatchfulConnection()
            │
            ├─► Success: Console shows "✅ Connected to watchful backend"
            └─► Failure: Console shows "⚠️ Could not connect..."
```

### Check Alert Sending:
```
Fall Detected
    │
    └─► sendFallAlertToWatchful()
            │
            ├─► Success: Console shows "✅ Fall alert sent"
            │            UI shows "✓ Sent"
            │
            └─► Failure: Console shows "❌ Failed to send..."
                     UI shows "✗ Failed"
                     Error details in console
```

---

## 🗺️ File Dependencies

```
index.html
    │
    ├─► <script src="js/config.js"></script>  ← Loads first (settings)
    │
    ├─► <script src="js/api.js"></script>      ← Loads second (needs config)
    │
    ├─► <script src="js/movement.js"></script> ← Loads third (motion detection)
    │
    └─► <script src="js/main.js"></script>      ← Loads last (uses everything)
```

**Order matters!** Each file depends on the ones before it.

---

## 🎯 Key Functions Map

```
config.js:
├─ WATCHFUL_CONFIG          → Settings object
├─ getWatchfulApiUrl()      → Returns backend URL
└─ getPatientId()           → Returns patient ID

api.js:
├─ getCurrentLocation()     → Gets GPS coordinates
├─ sendFallAlertToWatchful() → Sends alert to backend
└─ testWatchfulConnection()  → Tests if backend is reachable

main.js:
├─ startMotionTracking()    → Receives motion data
└─ (callback function)      → Handles falls, sends alerts

movement.js:
├─ calculateMagnitude()      → Calculates fall force
├─ handleMotion()           → Processes motion events
└─ enableMotion()          → Requests permissions
```

---

## 🚦 Status Indicators

### Connection Status:
- 🟢 `✅ Connected to watchful backend` = Ready to send alerts
- 🟡 `⚠️ Could not connect...` = Backend not running or wrong URL
- 🔴 `❌ Connection failed` = Network error or CORS issue

### Alert Status:
- 🟢 `✅ Fall alert sent` = Successfully sent to watchful
- 🔴 `❌ Failed to send` = Error occurred (check console for details)
- ⚪ `(no message)` = Alert not sent yet (still processing)

---

## 📊 Success Criteria

### ✅ Everything Working:
```
[Console]
✅ Connected to watchful backend
✅ Fall alert sent to watchful: { message: "Alert created...", alert_id: "..." }

[UI]
Status: FALL (red)
⚠️ Fall at 10:30:45 (mag 25.30) ✓ Sent

[Watchful Backend Terminal]
INFO: POST /api/alerts
Demo mode: Alert created - fall for patient patient_demo
```

### ❌ Something Wrong:
```
[Console]
⚠️ Could not connect to watchful backend: Failed to fetch
OR
❌ Failed to send fall alert: HTTP error! status: 404

[UI]
⚠️ Fall at 10:30:45 (mag 25.30) ✗ Failed

[Watchful Backend Terminal]
(No messages - backend not receiving requests)
```

---

## 🎓 Summary Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    THE BIG PICTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Device Motion → movement.js → main.js → api.js          │
│                                                           │
│                                    │                      │
│                                    ▼                      │
│                          Watchful Backend                 │
│                          (localhost:5000)                 │
│                                                           │
│  All connected via:                                       │
│  - config.js (settings)                                  │
│  - api.js (HTTP requests)                                │
│  - main.js (coordination)                                 │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**That's it!** Everything flows from device → detection → sending → watchful backend.
