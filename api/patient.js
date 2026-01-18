// Vercel Serverless Function - Patient endpoint
// This file should be in /api/patient.js for Vercel to recognize it

let patientInfo = {
  id: 'patient_demo',
  name: 'Patient',
  status: 'Safe',
  lastMovement: new Date().toISOString()
};

// Vercel Serverless Function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: patientInfo
    });
  }

  if (req.method === 'POST') {
    try {
      const updates = req.body;
      patientInfo = { ...patientInfo, ...updates };
      
      return res.status(200).json({
        success: true,
        data: patientInfo
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
