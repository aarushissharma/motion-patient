# ⚡ Make Dashboard Real-Time - Quick Guide

## 🎯 Problem
Dashboard shows old alerts ("fall detected at home just now") instead of real-time updates.

## ✅ Quick Fix (2 Steps)

### Step 1: Edit Dashboard File

**File:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**Find this line:**
```javascript
setInterval(fetchDashboardData, 30000); // 30 seconds
```

**Change to:**
```javascript
setInterval(fetchDashboardData, 2000); // 2 seconds (real-time!)
```

### Step 2: Restart Dashboard

```bash
# Stop dashboard (Ctrl+C)
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```

**That's it!** Dashboard will now update every 2 seconds! 🚀

---

## 🎯 What This Does

- **Before:** Dashboard checks for new alerts every 30 seconds (slow)
- **After:** Dashboard checks every 2 seconds (real-time!)

When a fall is detected:
1. Motion-patient sends alert → Backend (instant)
2. Backend stores alert (instant)
3. Dashboard fetches alerts every 2 seconds → Shows new alert!

---

## ✅ Expected Result

After making this change:
- ✅ New alerts appear within 1-2 seconds
- ✅ No more old/cached alerts
- ✅ Real-time updates!

---

## 🧪 Test It

1. **Make the change** (Step 1 above)
2. **Restart dashboard** (Step 2 above)
3. **Open motion-patient app**
4. **Simulate a fall**
5. **Watch dashboard** - should show new alert within 1-2 seconds!

---

## 📝 Full Code Example

If you want to add notifications for new alerts, see `DASHBOARD_QUICK_FIX.js` for complete code.

**But the simple fix above is enough to make it real-time!** 🎉
