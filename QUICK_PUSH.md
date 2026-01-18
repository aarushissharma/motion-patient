# Quick Push to GitHub

## Run These Commands

Copy and paste these commands one by one in your terminal:

```bash
cd /Users/riddhi/Downloads/motion-patient-main

# Initialize git
git init

# Connect to GitHub repo
git remote add origin https://github.com/aarushissharma/motion-patient.git

# If you get "remote already exists" error, use:
# git remote set-url origin https://github.com/aarushissharma/motion-patient.git

# Add all changes
git add .

# Commit
git commit -m "Add Vercel API endpoints and auto-detect Vercel deployment"

# Push to GitHub
git branch -M main
git push -u origin main
```

## If You Get Errors

### "Remote origin already exists"
```bash
git remote set-url origin https://github.com/aarushissharma/motion-patient.git
```

### "Updates were rejected" (repo has existing commits)
```bash
git pull origin main --allow-unrelated-histories
# Resolve any conflicts if needed
git push -u origin main
```

### Authentication Required
- GitHub will ask for username and password
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Get token from: https://github.com/settings/tokens
  - Create token with `repo` permissions

### "Permission denied"
Make sure you have write access to the repository.

## Files Being Pushed

✅ **Modified:**
- `js/config.js`
- `js/api.js`
- `js/main.js`
- `index.html`
- `package.json`

✅ **New Files:**
- `api/status.js`
- `api/alerts.js`
- `api/patient.js`
- `api/motion.js`
- `vercel.json`

## Verify After Push

Check your repo: https://github.com/aarushissharma/motion-patient

You should see:
- The `api/` folder with 4 files
- Updated `js/` files
- `vercel.json` file
- Updated `package.json`
