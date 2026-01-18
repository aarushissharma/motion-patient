# ⚡ Simple Real-Time Fix - 2 Steps

## 🎯 Problem
Dashboard shows old alerts ("fall detected at home just now") instead of real-time updates.

## ✅ Quick Fix (2 Steps)

### Step 1: Edit Dashboard File

**File:** `/Users/riddhi/Documents/GitHub/watchful/app/page.js`

**Find this line:**
```javascript
setInterval(fetchDashboardData, 30000);
```

**Change to:**
```javascript
setInterval(fetchDashboardData, 2000); // 2 seconds = real-time!
```

### Step 2: Restart Dashboard

```bash
# Stop dashboard (Ctrl+C in dashboard terminal)
cd /Users/riddhi/Documents/GitHub/watchful
npm run dev
```

**That's it!** Dashboard will now update every 2 seconds! 🚀

---

## ✅ What This Does

- **Before:** Dashboard checks every 30 seconds (slow, shows old alerts)
- **After:** Dashboard checks every 2 seconds (real-time, shows new alerts immediately!)

---

## 🧪 Test It

1. **Make the change** (change 30000 to 2000)
2. **Restart dashboard**
3. **Simulate a fall** in motion-patient app
4. **Watch dashboard** - new alert appears within 1-2 seconds!

---

## 📝 That's All!

Just change one number: `30000` → `2000`

Your dashboard will now be real-time! ⚡
