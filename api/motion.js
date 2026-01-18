// Vercel Serverless Function - Motion data endpoint
// This file should be in /api/motion.js for Vercel to recognize it

let motionData = [];
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
      data: motionData.slice(-50) // Last 50 motion events
    });
  }

  if (req.method === 'POST') {
    try {
      const motion = req.body;
      motion.timestamp = motion.timestamp || new Date().toISOString();
      motionData.push(motion);
      
      // Update patient status based on motion
      if (motion.eventType === 'FALL') {
        patientInfo.status = 'Fall';
      } else if (motion.eventType === 'NORMAL' && patientInfo.status === 'Fall') {
        // Only change to Safe if no active falls
        patientInfo.status = 'Safe';
      }
      patientInfo.lastMovement = motion.timestamp;
      
      // Keep only last 1000 motion events
      if (motionData.length > 1000) {
        motionData = motionData.slice(-1000);
      }

      return res.status(200).json({
        success: true,
        data: motion
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
