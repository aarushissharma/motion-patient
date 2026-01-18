/**
 * Vercel Serverless Function - Voice Processing API
 * Handles voice transcripts and AI processing
 */

// In-memory storage (replace with database in production)
const voiceTranscripts = [];

// AI Processing function
async function processWithAI(transcript) {
  try {
    // Option 1: Use OpenAI (if API key is set)
    if (process.env.OPENAI_API_KEY) {
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful medical assistant. A patient has fallen and is speaking to you. Be empathetic, assess their condition, and provide helpful guidance. Keep responses brief (1-2 sentences).',
          },
          {
            role: 'user',
            content: `A patient has fallen and says: "${transcript}". How should I respond?`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    }

    // Option 2: Use Google Generative AI (if API key is set)
    if (process.env.GOOGLE_AI_API_KEY) {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `A patient has fallen and says: "${transcript}". As a medical assistant, provide a brief, empathetic response (1-2 sentences) assessing their condition and offering help.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }

    // Fallback: Simple rule-based response
    const lowerTranscript = transcript.toLowerCase();
    
    if (lowerTranscript.includes('okay') || lowerTranscript.includes('ok') || lowerTranscript.includes('fine')) {
      return "I'm glad you're okay. Help is on the way. Stay calm and don't move if you're injured.";
    } else if (lowerTranscript.includes('hurt') || lowerTranscript.includes('pain') || lowerTranscript.includes('injured')) {
      return "I understand you're hurt. Help is being notified. Try to stay still and describe where you feel pain if possible.";
    } else if (lowerTranscript.includes('help') || lowerTranscript.includes('emergency')) {
      return "Help is on the way. Emergency services have been notified. Can you tell me more about what happened?";
    } else {
      return "I've notified your caregiver about the fall. Help is on the way. Can you tell me if you're able to move safely?";
    }
  } catch (error) {
    console.error('AI processing error:', error);
    // Fallback response
    return "I've received your message and notified your caregiver. Help is on the way. Please stay calm.";
  }
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Process voice transcript with AI
  if (req.method === 'POST' && (req.url.includes('/process') || req.url.endsWith('/voice/process'))) {
    try {
      const { transcript, fallAlertId, timestamp } = req.body;

      if (!transcript) {
        return res.status(400).json({
          success: false,
          error: 'Transcript is required',
        });
      }

      // Process with AI
      const aiResponse = await processWithAI(transcript);

      return res.status(200).json({
        success: true,
        data: {
          transcript,
          aiResponse,
          fallAlertId,
          timestamp: timestamp || new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Voice processing error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to process voice transcript',
      });
    }
  }

  // Store voice transcript
  if (req.method === 'POST' && (req.url.includes('/transcript') || req.url.endsWith('/voice/transcript'))) {
    try {
      const { fallAlertId, transcript, aiResponse, timestamp } = req.body;

      if (!transcript || !fallAlertId) {
        return res.status(400).json({
          success: false,
          error: 'Transcript and fallAlertId are required',
        });
      }

      const voiceData = {
        id: Date.now().toString(),
        fallAlertId,
        transcript,
        aiResponse,
        timestamp: timestamp || new Date().toISOString(),
      };

      voiceTranscripts.push(voiceData);

      return res.status(200).json({
        success: true,
        data: voiceData,
      });
    } catch (error) {
      console.error('Store transcript error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to store transcript',
      });
    }
  }

  // Get transcripts for a fall alert
  if (req.method === 'GET' && (req.url.includes('/transcript') || req.url.includes('/voice'))) {
    try {
      // Parse query parameters
      const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
      const params = new URLSearchParams(queryString);
      const fallAlertId = params.get('fallAlertId');

      if (!fallAlertId) {
        return res.status(400).json({
          success: false,
          error: 'fallAlertId is required',
        });
      }

      const transcripts = voiceTranscripts.filter(
        (t) => t.fallAlertId === fallAlertId
      );

      return res.status(200).json({
        success: true,
        data: transcripts,
      });
    } catch (error) {
      console.error('Get transcripts error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to get transcripts',
      });
    }
  }

  // Get all transcripts
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: voiceTranscripts,
    });
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
};
