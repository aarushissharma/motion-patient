#!/bin/bash

# Script to clean up local package directories in watchful folder
# These directories interfere with properly installed packages

echo "🧹 Cleaning up local package directories..."
echo ""

cd /Users/riddhi/Documents/GitHub/watchful

# Remove local package directories
echo "Removing local package directories..."
rm -rf click
rm -rf firebase_admin
rm -rf fastapi.backup
rm -rf uvicorn
rm -rf fastapi

# Remove all .dist-info directories (these are package metadata that shouldn't be in the project)
echo "Removing .dist-info directories..."
rm -rf *.dist-info

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Now reinstalling packages..."
pip3 install --upgrade uvicorn fastapi click firebase-admin python-dotenv geopy

echo ""
echo "✅ Done! You can now run: python3 app.py"
