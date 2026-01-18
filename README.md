# motion-patient

Motion detection application for patient fall detection, connected to the Watchful backend system and Vercel API.

## Features

- Real-time motion tracking using device accelerometer
- Fall detection with magnitude analysis
- Automatic alert sending to Watchful backend and Vercel API
- Location tracking integration
- Visual status indicators
- Vercel deployment support with auto-detection

## Setup

### Prerequisites

1. For local development, make sure the Watchful backend is running
   - Navigate to `/Users/riddhi/Documents/GitHub/watchful`
   - Start the FastAPI backend server (typically runs on port 5000)

2. For Vercel deployment:
   - The app auto-detects Vercel environment
   - API endpoints are available at `/api/status`, `/api/alerts`, `/api/patient`, `/api/motion`

### Configuration

The app automatically detects the environment:
- **Vercel**: Uses `window.location.origin` for API calls
- **Local**: Uses `http://localhost:3001` (or configured port)

To customize the connection:

1. Edit `js/config.js`:
   - Update `API_BASE_URL` to match your backend URL
   - Set `PATIENT_ID` to match a patient ID in your system
   - Enable/disable the API connection with `ENABLED`

2. Or set via browser console:
   ```javascript
   localStorage.setItem('watchful_api_url', 'http://your-backend-url:5000');
   localStorage.setItem('watchful_patient_id', 'your-patient-id');
   ```

## Usage

1. Open `index.html` in a web browser (preferably Safari for iOS devices)
2. Click "Enable Motion" to grant motion permissions
3. The app will track motion and detect falls
4. When a fall is detected, it will:
   - Display a visual alert
   - Log the fall event
   - Automatically send an alert to the backend (Watchful or Vercel API)
   - Include location data if available

## Connection

The app automatically connects to:
- **Local Development**: `http://localhost:3001` (or configured port)
- **Vercel Deployment**: Uses the deployed Vercel domain automatically

When a fall is detected, the app sends a POST request with:
- Patient ID
- Alert type: "fall"
- Severity: "high"
- Location (if available)
- Timestamp
- Motion data (magnitude, acceleration values)

## Testing the Connection

Open the browser console to see connection status:
- ✅ Green checkmark = Connected successfully
- ⚠️ Warning = Connection failed (check if backend is running)

## Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy - the app will auto-detect Vercel environment
4. API endpoints are available at `/api/*`

The app automatically uses the correct API URL based on the deployment environment.
