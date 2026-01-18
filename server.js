// Simple local server for motion-patient-main
// Exposes fall data and motion data to motion-main app

const http = require('http');
const fs = require('fs');
const path = require('path');

// In-memory data store
let fallData = [];
let motionData = [];
let patientInfo = {
  id: 'patient_demo',
  name: 'Patient',
  status: 'Safe',
  lastMovement: new Date().toISOString()
};

const PORT = 3001; // Different port from backend

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Serve index.html for root
  if (pathname === '/' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  // API Routes
  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Motion Patient Server Running',
      patient: patientInfo,
      fallCount: fallData.length,
      lastFall: fallData.length > 0 ? fallData[fallData.length - 1] : null
    }));
    return;
  }

  // Get all falls
  if (pathname === '/api/falls' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: fallData
    }));
    return;
  }

  // Get recent falls (alerts)
  if (pathname === '/api/alerts' && req.method === 'GET') {
    // Return falls as alerts format
    const alerts = fallData
      .filter(fall => {
        // Only return falls from last 24 hours
        const fallTime = new Date(fall.timestamp);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return fallTime > dayAgo;
      })
      .map(fall => ({
        id: fall.id || `fall_${fall.timestamp}`,
        patient_id: patientInfo.id,
        alert_type: 'fall',
        severity: 'high',
        location: fall.location || { lat: 0, lng: 0, address: 'Location unavailable' },
        timestamp: fall.timestamp,
        message: fall.message || `Fall detected at ${fall.time} with magnitude ${fall.magnitude}`,
        status: fall.status || 'active',
        caregiver_id: 'caregiver_demo'
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first

    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: alerts
    }));
    return;
  }

  // Add fall (POST from motion-patient app)
  if (pathname === '/api/falls' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const fall = JSON.parse(body);
        fall.id = fall.id || `fall_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        fall.timestamp = fall.timestamp || new Date().toISOString();
        fall.status = fall.status || 'active';
        
        fallData.push(fall);
        
        // Update patient status
        patientInfo.status = 'Fall';
        patientInfo.lastMovement = fall.timestamp;
        
        // Keep only last 100 falls
        if (fallData.length > 100) {
          fallData = fallData.slice(-100);
        }

        console.log('✅ Fall received:', fall.id);
        
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          data: fall
        }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
    return;
  }

  // Get patient info
  if (pathname === '/api/patient' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: patientInfo
    }));
    return;
  }

  // Update patient info
  if (pathname === '/api/patient' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        patientInfo = { ...patientInfo, ...updates };
        
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          data: patientInfo
        }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
    return;
  }

  // Update alert status
  if (pathname.startsWith('/api/alerts/') && req.method === 'PUT') {
    const alertId = pathname.split('/').pop();
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const fallIndex = fallData.findIndex(f => f.id === alertId);
        
        if (fallIndex !== -1) {
          fallData[fallIndex] = { ...fallData[fallIndex], ...updates };
          
          // Update patient status if all falls resolved
          if (updates.status === 'resolved') {
            const activeFalls = fallData.filter(f => f.status === 'active');
            if (activeFalls.length === 0) {
              patientInfo.status = 'Safe';
            }
          }
          
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            data: fallData[fallIndex]
          }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({
            success: false,
            error: 'Alert not found'
          }));
        }
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
    return;
  }

  // Get motion data
  if (pathname === '/api/motion' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: motionData.slice(-50) // Last 50 motion events
    }));
    return;
  }

  // Add motion data
  if (pathname === '/api/motion' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const motion = JSON.parse(body);
        motion.timestamp = motion.timestamp || new Date().toISOString();
        motionData.push(motion);
        
        // Update patient status based on motion
        if (motion.eventType === 'FALL') {
          patientInfo.status = 'Fall';
        } else if (motion.eventType === 'NORMAL' && patientInfo.status === 'Fall') {
          // Only change to Safe if no active falls
          const activeFalls = fallData.filter(f => f.status === 'active');
          if (activeFalls.length === 0) {
            patientInfo.status = 'Safe';
          }
        }
        patientInfo.lastMovement = motion.timestamp;
        
        // Keep only last 1000 motion events
        if (motionData.length > 1000) {
          motionData = motionData.slice(-1000);
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          data: motion
        }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    error: 'Not found'
  }));
});

server.listen(PORT, () => {
  console.log(`🚀 Motion Patient Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/`);
  console.log(`📊 Status: http://localhost:${PORT}/api/status`);
  console.log(`📉 Falls: http://localhost:${PORT}/api/falls`);
  console.log(`🚨 Alerts: http://localhost:${PORT}/api/alerts`);
});
