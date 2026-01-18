# GitHub Authentication Fix

## The Problem
GitHub no longer accepts passwords for git operations. You need a **Personal Access Token (PAT)**.

## Solution: Create Personal Access Token

### Step 1: Create Token on GitHub

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `motion-patient-push`
4. Select expiration: Choose how long you want it (90 days, 1 year, or no expiration)
5. **Select scopes:**
   - ✅ **repo** (Full control of private repositories)
   - This gives you read/write access to repos
6. Click **"Generate token"**
7. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

### Step 2: Use Token to Push

When git asks for password, **paste the token** (not your GitHub password).

```bash
cd /Users/riddhi/Downloads/motion-patient-main

# Try pushing again
git push -u origin main

# When it asks:
# Username: riddhig07
# Password: [PASTE YOUR TOKEN HERE]
```

## Alternative: Use SSH (Recommended for Long-term)

### Step 1: Generate SSH Key (if you don't have one)

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Press Enter for no passphrase (or set one)
```

### Step 2: Add SSH Key to GitHub

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to: https://github.com/settings/keys
3. Click **"New SSH key"**
4. Paste the key and save

### Step 3: Use SSH URL Instead

```bash
cd /Users/riddhi/Downloads/motion-patient-main

# Change remote to SSH
git remote set-url origin git@github.com:aarushissharma/motion-patient.git

# Now push (no password needed)
git push -u origin main
```

## Quick Fix Right Now

**Option 1: Use Personal Access Token (Easiest)**

1. Get token: https://github.com/settings/tokens
2. Generate new token with `repo` scope
3. Copy the token
4. Run:
   ```bash
   git push -u origin main
   ```
5. When asked for password, paste the token

**Option 2: Use GitHub CLI**

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Login
gh auth login

# Then push
git push -u origin main
```

## What to Do Now

**Easiest: Get a Personal Access Token**

1. Visit: https://github.com/settings/tokens/new
2. Name: `motion-patient`
3. Expiration: 90 days (or your choice)
4. Check: ✅ **repo**
5. Generate → Copy token
6. Run `git push -u origin main` again
7. Username: `riddhig07`
8. Password: **paste the token**

The token will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
