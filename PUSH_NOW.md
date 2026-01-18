# Push Changes to GitHub

## Current Status
✅ Git repository initialized
✅ Remote configured: `https://github.com/aarushissharma/motion-patient.git`
✅ Changes committed: "Add Vercel API endpoints and auto-detect Vercel deployment"

## Step-by-Step Push Instructions

### Step 1: Get Personal Access Token

GitHub requires a **Personal Access Token** (not your password):

1. Go to: **https://github.com/settings/tokens/new**
2. **Token name**: `motion-patient-push`
3. **Expiration**: Choose 90 days (or your preference)
4. **Select scopes**: ✅ Check **`repo`** (Full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN** - it starts with `ghp_...` and you won't see it again!

### Step 2: Add Any New Files (Optional)

If you want to include the helper files:

```bash
cd /Users/riddhi/Downloads/motion-patient-main

# Add all files (including helper docs)
git add .

# Or add only specific files
git add api/ js/ index.html package.json vercel.json
```

### Step 3: Commit (if needed)

```bash
# Only if you added new files
git commit -m "Add Vercel API endpoints and configuration"
```

### Step 4: Push to GitHub

```bash
# Push to GitHub
git push -u origin main
```

**When prompted:**
- **Username**: `riddhig07`
- **Password**: **Paste your Personal Access Token** (the `ghp_...` token you copied)

## Alternative: Use SSH (No Password Needed)

If you prefer SSH authentication:

```bash
# Change remote to SSH
git remote set-url origin git@github.com:aarushissharma/motion-patient.git

# Push (no password needed if SSH key is configured)
git push -u origin main
```

## Quick Copy-Paste Commands

```bash
cd /Users/riddhi/Downloads/motion-patient-main
git add .
git commit -m "Add Vercel API endpoints and auto-detect Vercel deployment"
git push -u origin main
```

Then paste your Personal Access Token when asked for password.

## Verify After Push

Check your repository: **https://github.com/aarushissharma/motion-patient**

You should see:
- ✅ `api/` folder with 4 files (status.js, alerts.js, patient.js, motion.js)
- ✅ Updated `js/` files (config.js, api.js, main.js)
- ✅ `vercel.json` configuration
- ✅ Updated `package.json` with Node.js 24.x

## Troubleshooting

**"Authentication failed"**
- Make sure you're using a Personal Access Token, not your GitHub password
- Token must have `repo` scope

**"Permission denied"**
- Make sure you have write access to the repository
- Check if the repository owner is `aarushissharma` and you have access

**"Updates were rejected"**
- The remote has changes you don't have locally
- Run: `git pull origin main --allow-unrelated-histories`
- Then: `git push -u origin main`
