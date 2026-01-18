# Baby Steps Explanation: Connecting Motion-Patient to Watchful

## 🎯 What We're Doing (The Big Picture)

We're connecting your **motion-patient** app (which detects falls) to your **watchful** backend system (which manages alerts). When a fall is detected, the app will automatically send an alert to watchful.

---

## 📁 Step 1: Understanding the Files We Created

### File 1: `js/config.js` - The Settings File
**What it does:** Stores all the configuration settings (like addresses and IDs)

**Think of it like:** A phone book that tells the app:
- Where to find the watchful backend (the address)
- Which patient this device belongs to
- Whether the connection is turned on or off

**Key parts:**
```javascript
API_BASE_URL: 'http://localhost:5000'
```
This is like the phone number/address. It says "the watchful backend is at localhost:5000"

```javascript
PATIENT_ID: 'patient_demo'
```
This is like saying "this device belongs to patient_demo"

---

### File 2: `js/api.js` - The Messenger
**What it does:** Handles all communication with the watchful backend

**Think of it like:** A mail carrier that:
1. Gets the current location (where the patient is)
2. Packages up the fall alert with all the details
3. Sends it to the watchful backend
4. Tells you if it was successful or not

**Key functions:**

#### `getCurrentLocation()`
- Asks the browser "Where are we right now?"
- Gets GPS coordinates (latitude, longitude)
- If it can't get location, it says "Location unavailable" (but still works!)

#### `sendFallAlertToWatchful(fallData)`
- Takes the fall data (how hard they fell, acceleration, etc.)
- Gets the location
- Packages everything into a nice format
- Sends it to watchful backend at `/api/alerts`
- Returns success or error message

#### `testWatchfulConnection()`
- When the page loads, checks "Can I talk to watchful?"
- Like calling someone to see if they answer
- Shows a ✅ if connected, ⚠️ if not

---

### File 3: Updated `js/main.js` - The Coordinator
**What it does:** The main brain that coordinates everything

**What changed:**
1. **On page load:** Tests the connection to watchful
   ```javascript
   window.addEventListener('DOMContentLoaded', async () => {
     // Test connection when page loads
   })
   ```

2. **When a fall is detected:** Sends alert to watchful
   ```javascript
   if (data.eventType === "FALL") {
     // ... show it on screen ...
     // ... AND send to watchful ...
     sendFallAlertToWatchful(data)
   }
   ```

---

## 🔄 Step 2: How It All Works Together (The Flow)

### Scenario: Patient Falls Down

1. **Motion sensor detects fall** (movement.js)
   - Device accelerometer notices sudden movement
   - Calculates: "This looks like a fall!"

2. **main.js receives the alert**
   - Gets data: `{ eventType: "FALL", magnitude: 25.3, ax: 10, ay: 5, az: 20 }`
   - Shows red alert on screen
   - Logs it in the fall log

3. **main.js calls sendFallAlertToWatchful()**
   - Passes the fall data to api.js

4. **api.js gets location**
   - Asks browser: "Where are we?"
   - Gets: `{ lat: 37.7749, lng: -122.4194 }` (example coordinates)

5. **api.js packages the data**
   - Creates a nice package:
     ```javascript
     {
       patient_id: "patient_demo",
       alert_type: "fall",
       severity: "high",
       location: { lat: 37.7749, lng: -122.4194 },
       timestamp: "2024-01-15T10:30:00Z",
       message: "Fall detected with magnitude 25.3..."
     }
     ```

6. **api.js sends HTTP POST request**
   - Like sending a letter via mail
   - Address: `http://localhost:5000/api/alerts`
   - Method: POST (means "create new alert")
   - Body: The packaged data

7. **Watchful backend receives it**
   - Gets the POST request
   - Saves the alert to database
   - Sends notifications to caregivers
   - Returns: "✅ Alert created successfully"

8. **api.js gets response**
   - If successful: Shows ✅ in console and UI
   - If failed: Shows ❌ and error message

---

## 🔌 Step 3: The Connection Details

### What is `http://localhost:5000`?

- **localhost** = "this computer" (the same computer running the app)
- **5000** = port number (like a door number)
- **http://** = the protocol (how to talk)

So `http://localhost:5000` means: "The watchful backend on this computer, door #5000"

### What is `/api/alerts`?

This is the **endpoint** - a specific function in the watchful backend that:
- Accepts alert data
- Saves it
- Sends notifications

Think of it like: `localhost:5000` is the building, `/api/alerts` is the specific office inside.

---

## 🛠️ Step 4: How to Use It

### Prerequisites (What You Need First)

1. **Watchful backend must be running**
   ```bash
   cd /Users/riddhi/Documents/GitHub/watchful
   # Then start the server (usually: python app.py or uvicorn app:app)
   ```

2. **Check it's working**
   - Open browser: `http://localhost:5000`
   - Should see: `{"message": "Caregiver Alert System API", "status": "running"}`

### Using the Motion-Patient App

1. **Open the app**
   - Open `index.html` in a browser

2. **Check the console** (F12 → Console tab)
   - Should see: `✅ Connected to watchful backend` (if working)
   - Or: `⚠️ Could not connect...` (if backend not running)

3. **Enable motion tracking**
   - Click "Enable Motion" button
   - Grant permissions

4. **Test a fall**
   - Simulate a fall (shake device hard)
   - Watch the console for: `✅ Fall alert sent to watchful`
   - Check watchful backend to see the alert appear

---

## 🎨 Step 5: What You See in the UI

### When a Fall is Detected:

**Before sending:**
```
⚠️ Fall at 10:30:45 (mag 25.30)
```

**After successful send:**
```
⚠️ Fall at 10:30:45 (mag 25.30) ✓ Sent
```

**After failed send:**
```
⚠️ Fall at 10:30:45 (mag 25.30) ✗ Failed
```

---

## 🔧 Step 6: Customization

### Change the Backend URL

**Option 1: Edit config.js**
```javascript
API_BASE_URL: 'http://192.168.1.100:5000'  // Different computer
```

**Option 2: Use browser console**
```javascript
localStorage.setItem('watchful_api_url', 'http://192.168.1.100:5000');
// Refresh page
```

### Change Patient ID

**Option 1: Edit config.js**
```javascript
PATIENT_ID: 'patient_1'  // Different patient
```

**Option 2: Use browser console**
```javascript
localStorage.setItem('watchful_patient_id', 'patient_1');
// Refresh page
```

---

## 🐛 Step 7: Troubleshooting

### Problem: "Could not connect to watchful backend"

**Check:**
1. Is watchful backend running? 
   - Go to `http://localhost:5000` in browser
   - Should see JSON response

2. Is the port correct?
   - Check what port watchful uses
   - Update `API_BASE_URL` in config.js

3. CORS issues?
   - Watchful backend should allow CORS (it does in the code)
   - Check browser console for CORS errors

### Problem: "Failed to send fall alert"

**Check:**
1. Is the backend running? (same as above)

2. Is the patient_id valid?
   - Check watchful backend has this patient
   - Or create a test patient with that ID

3. Check browser console for error details

---

## 📊 Step 8: Data Flow Diagram

```
┌─────────────────┐
│  Device Motion  │
│   (Accelerometer)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  movement.js    │  Detects fall
│  (Calculates)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   main.js       │  Receives fall data
│  (Coordinates)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    api.js       │  Gets location
│  (Messenger)    │  Packages data
└────────┬────────┘
         │
         │ HTTP POST
         ▼
┌─────────────────┐
│ Watchful Backend│  Receives alert
│  /api/alerts    │  Saves to database
│                 │  Sends notifications
└─────────────────┘
```

---

## ✅ Summary

**What we did:**
1. Created `config.js` - stores settings (where to send, which patient)
2. Created `api.js` - handles sending data to watchful
3. Updated `main.js` - calls api.js when fall detected
4. Updated `index.html` - loads the new files

**How it works:**
- Fall detected → Get location → Package data → Send to watchful → Show success/failure

**To use:**
- Start watchful backend
- Open motion-patient app
- Enable motion tracking
- Falls automatically send to watchful!

---

## 🎓 Key Concepts Explained Simply

- **API**: A way for two programs to talk to each other
- **POST request**: Sending data to create something new (like creating an alert)
- **Endpoint**: A specific function/address in the backend (like `/api/alerts`)
- **Async/Await**: "Do this, wait for it to finish, then do that"
- **Promise**: "I'll do this and tell you when I'm done"
- **localStorage**: Browser's way to remember settings between page refreshes
