# Quick Deploy Instructions

## Files Updated
- `js/config.js` - Now auto-detects Vercel
- `js/api.js` - Uses Vercel URL when deployed
- `js/main.js` - Fixed API URL detection
- `index.html` - Fixed API URL in script
- `api/alerts.js` - Improved fall data handling

## Deploy to Vercel

Run this command:

```bash
cd /Users/riddhi/Downloads/motion-patient-main
vercel --prod
```

## After Deployment

1. Go to: https://motion-project-main.vercel.app/
2. Open browser console (F12)
3. Run this to clear old cache:
   ```javascript
   localStorage.clear();
   location.reload();
   ```
4. Connection should now show Vercel URL
5. Test fall detection
6. Check dashboard: http://localhost:8082/dashboard
