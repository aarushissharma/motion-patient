#!/bin/bash
# Commands to push changes to GitHub

echo "🚀 Pushing motion-patient-main to GitHub..."
echo ""

cd /Users/riddhi/Downloads/motion-patient-main

# Step 1: Initialize git (if not already)
echo "Step 1: Initializing git..."
git init

# Step 2: Add remote (or update if exists)
echo "Step 2: Setting up remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/aarushissharma/motion-patient.git

# Step 3: Check status
echo "Step 3: Checking changes..."
git status

# Step 4: Add all files
echo "Step 4: Adding all files..."
git add .

# Step 5: Commit
echo "Step 5: Committing changes..."
git commit -m "Add Vercel API endpoints and auto-detect Vercel deployment

- Added API endpoints: status, alerts, patient, motion
- Auto-detects Vercel and uses correct API URL
- Fixed connection to work with Vercel deployment
- Added vercel.json configuration
- Updated to Node.js 24.x for Vercel compatibility"

# Step 6: Push
echo "Step 6: Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Check https://github.com/aarushissharma/motion-patient"
