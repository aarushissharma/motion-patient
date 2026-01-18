#!/bin/bash
# Resolve all merge conflicts

cd /Users/riddhi/Downloads/motion-patient-main

echo "🔧 Resolving merge conflicts..."

# Keep local versions (with Vercel integration) for JS files
echo "✅ Keeping local versions of js/main.js and js/movement.js (Vercel integration)"
git checkout --ours js/main.js
git checkout --ours js/movement.js

# Keep local version of index.html (has Vercel detection)
echo "✅ Keeping local version of index.html (Vercel detection)"
git checkout --ours index.html

# Keep local version of styles.css (has connection status styles)
echo "✅ Keeping local version of styles.css (connection status styles)"
git checkout --ours styles.css

# .gitignore and README.md and package.json already resolved manually
echo "✅ .gitignore, README.md, and package.json already resolved"

# Add all resolved files
echo "📦 Staging resolved files..."
git add .gitignore README.md package.json index.html js/main.js js/movement.js styles.css

echo ""
echo "✅ All conflicts resolved!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Commit: git commit -m 'Merge remote changes with Vercel API integration'"
echo "3. Push: git push -u origin main"
