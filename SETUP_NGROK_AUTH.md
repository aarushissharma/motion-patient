# 🔐 Setup ngrok Authentication

## Quick Setup (2 Steps)

### Step 1: Sign Up & Get Authtoken

1. **Go to:** https://dashboard.ngrok.com/signup
2. **Sign up** for a free account (takes 30 seconds)
3. **After signing up**, go to: https://dashboard.ngrok.com/get-started/your-authtoken
4. **Copy your authtoken** (looks like: `2abc123def456ghi789jkl012mno345pq_6rstuvwxyz7890`)

### Step 2: Configure ngrok

**Run this command** (replace `YOUR_AUTHTOKEN` with your actual token):

```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```

**Example:**
```bash
ngrok config add-authtoken 2abc123def456ghi789jkl012mno345pq_6rstuvwxyz7890
```

You should see: `Authtoken saved to configuration file.`

---

## ✅ Then Start ngrok

After authentication, start ngrok:

```bash
ngrok http 5001
```

You'll see:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5001
```

**Copy the `https://` URL!**

---

## 🚀 Next Steps

1. **Get your ngrok URL** (from above)
2. **Open deployed app:**
   ```
   https://motion-patient-j2bhlcp4a-aarushi-sharmas-projects-d3182694.vercel.app/?api_url=https://YOUR_NGROK_URL
   ```
3. **Check dashboard** at `http://localhost:3000`

---

## 💡 Quick Reference

**Sign up:** https://dashboard.ngrok.com/signup
**Get authtoken:** https://dashboard.ngrok.com/get-started/your-authtoken
**Configure:** `ngrok config add-authtoken YOUR_TOKEN`
