# motion-patient

Motion detection application for patient fall detection, connected to the Watchful backend system.

## Features

- Real-time motion tracking using device accelerometer
- Fall detection with magnitude analysis
- Automatic alert sending to Watchful backend
- Location tracking integration
- Visual status indicators

## Setup

### Prerequisites

1. Make sure the Watchful backend is running
   - Navigate to `/Users/riddhi/Documents/GitHub/watchful`
   - Start the FastAPI backend server (typically runs on port 5000)

### Configuration

The app is configured to connect to the Watchful backend at `http://localhost:5000` by default.

To customize the connection:

1. Edit `js/config.js`:
   - Update `API_BASE_URL` to match your Watchful backend URL
   - Set `PATIENT_ID` to match a patient ID in your Watchful system
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
   - Automatically send an alert to the Watchful backend
   - Include location data if available

## Connection to Watchful

The app automatically connects to the Watchful backend at:
- **Backend Path**: `/Users/riddhi/Documents/GitHub/watchful`
- **API Endpoint**: `http://localhost:5000/api/alerts` (default)

When a fall is detected, the app sends a POST request to the Watchful backend with:
- Patient ID
- Alert type: "fall"
- Severity: "high"
- Location (if available)
- Timestamp
- Motion data (magnitude, acceleration values)

## Testing the Connection

Open the browser console to see connection status:
- ✅ Green checkmark = Connected successfully
- ⚠️ Warning = Connection failed (check if Watchful backend is running)
