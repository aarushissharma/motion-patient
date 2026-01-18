# 🎯 Simple Guide: Connect Device to Caregiver Dashboard

## 🚀 Quick Start (3 Steps)

### Step 1: Start Backend
```bash
cd /Users/riddhi/Documents/GitHub/watchful
python app.py
```
✅ Check: Open `http://localhost:5000` - should see JSON

---

### Step 2: Start Dashboard
```bash
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```
✅ Check: Open `http://localhost:3000` - should see dashboard

---

### Step 3: Open Motion-Patient App
- Open `index.html` in browser
- Click "Enable Motion"
- Shake device (or simulate fall)

✅ Check: Alert appears on dashboard within 30 seconds

---

## 📱 The Flow (What Happens)

```
1. Device detects fall
   ↓
2. Motion-patient sends alert to backend (port 5000)
   ↓
3. Backend saves alert
   ↓
4. Dashboard fetches alerts every 30 seconds
   ↓
5. Caregiver sees alert on dashboard! 🎉
```

---

## ⚙️ Configuration Files

### Motion-Patient Config
**File:** `motion-patient-main/js/config.js`
```javascript
API_BASE_URL: 'http://localhost:5000'  // ← Backend port
PATIENT_ID: 'patient_demo'              // ← Patient ID
```

### Dashboard Config  
**File:** `watchful/config/api.js`
```javascript
// Already updated to use port 5000 ✅
```

---

## 🔍 How to Verify It's Working

### On Device:
- Console shows: `✅ Connected to watchful backend`
- After fall: `✅ Fall alert sent to watchful`

### On Backend Terminal:
- Shows: `Demo mode: Alert created - fall for patient patient_demo`

### On Dashboard:
- Click "Refresh" or wait 30 seconds
- Alert appears in "Active Alerts" section

---

## 🌐 If Device is on Different Computer/Phone

**Change in `motion-patient-main/js/config.js`:**
```javascript
API_BASE_URL: 'http://192.168.1.100:5000'  // ← Your computer's IP
```

**Find your IP:**
- Mac: `ifconfig | grep "inet "`
- Windows: `ipconfig`

---

## ✅ That's It!

When device detects fall → Alert sent → Dashboard shows it!

**Need more details?** See `COMPLETE_SETUP.md`
