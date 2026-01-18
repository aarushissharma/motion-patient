// Vercel Serverless Function - Status endpoint
// This file should be in /api/status.js for Vercel to recognize it

// In-memory storage (for demo - in production, use a database)
// Note: This resets on each serverless function invocation
// For persistent storage, use Vercel KV, MongoDB, or similar

let fallData = [];
let motionData = [];
let patientInfo = {
  id: 'patient_demo',
  name: 'Patient',
  status: 'Safe',
  lastMovement: new Date().toISOString()
};

// Try to load from Vercel KV or environment if available
// For now, we'll use a simple in-memory approach

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
    return res.status(200).json({
      success: true,
      message: 'Motion Patient Server Running',
      patient: patientInfo,
      fallCount: fallData.length,
      lastFall: fallData.length > 0 ? fallData[fallData.length - 1] : null
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
