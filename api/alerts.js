// Vercel Serverless Function - Alerts endpoint
// This file should be in /api/alerts.js for Vercel to recognize it

// IMPORTANT: Vercel serverless functions are stateless
// In-memory storage resets on each invocation
// For production, use Vercel KV, MongoDB, or a database

// Use a simple in-memory store (will reset, but works for testing)
// In production, replace with Vercel KV or database
let fallData = [];

// Helper to get shared storage (for production, use Vercel KV)
async function getFallData() {
  // TODO: Replace with Vercel KV in production
  // const kv = require('@vercel/kv');
  // return await kv.get('falls') || [];
  return fallData;
}

async function saveFallData(data) {
  // TODO: Replace with Vercel KV in production
  // const kv = require('@vercel/kv');
  // await kv.set('falls', data);
  fallData = data;
}

// Vercel Serverless Function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const data = await getFallData();
      
      // Return falls as alerts format
      const alerts = data
        .filter(fall => {
          // Only return falls from last 24 hours
          const fallTime = new Date(fall.timestamp);
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          return fallTime > dayAgo;
        })
        .map(fall => ({
          id: fall.id || `fall_${fall.timestamp}`,
          patient_id: fall.patient_id || 'patient_demo',
          alert_type: 'fall',
          severity: 'high',
          location: fall.location || { lat: 0, lng: 0, address: 'Location unavailable' },
          timestamp: fall.timestamp,
          message: fall.message || `Fall detected at ${fall.time} with magnitude ${fall.magnitude || 'N/A'}`,
          status: fall.status || 'active',
          caregiver_id: 'caregiver_demo'
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first

      return res.status(200).json({
        success: true,
        data: alerts
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const fall = req.body;
      fall.id = fall.id || `fall_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      fall.timestamp = fall.timestamp || new Date().toISOString();
      fall.status = fall.status || 'active';
      
      const data = await getFallData();
      data.push(fall);
      
      // Keep only last 100 falls
      if (data.length > 100) {
        data.splice(0, data.length - 100);
      }
      
      await saveFallData(data);

      console.log('✅ Fall saved:', fall.id);

      return res.status(200).json({
        success: true,
        data: fall
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
