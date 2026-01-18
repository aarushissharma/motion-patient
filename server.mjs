import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { exec } from "child_process";

dotenv.config();
const app = express();
app.use(express.json());

console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Store patient conversations in memory
const conversations = {}; // { patientId: [{ role, content }] }

// Helper: speak message out loud (macOS)
function speak(message) {
  exec(`say "${message.replace(/\n/g, ' ')}"`);
}

// Main endpoint for patient alerts and responses
app.post("/ai/patient-alert", async (req, res) => {
  const { patientId, name, message } = req.body;
  if (!patientId || !message) {
    return res.status(400).json({ error: "patientId and message are required" });
  }

  if (!conversations[patientId]) conversations[patientId] = [];

  // Append patient message to conversation
  conversations[patientId].push({ role: "user", content: message });

  // System prompt for short, interactive, calm assistant
  const systemPrompt = `
You are a calm, gentle AI assistant helping an Alzheimer's patient.
- Respond ONLY as if speaking out loud.
- Keep sentences under 12 words.
- Ask short yes/no questions to check condition.
- Reassure patient and give simple instructions.
- Do NOT give step-by-step medical guides.
- If danger is detected, ask if they want to call 911 or their emergency contact.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversations[patientId]
      ]
    });

    const aiMessage = completion.choices[0].message.content.trim();

    // Append AI message to conversation
    conversations[patientId].push({ role: "assistant", content: aiMessage });

    // Speak out loud
    speak(aiMessage);

    res.json({ spokenMessage: aiMessage });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "AI failed", details: err.message });
  }
});

// server.mjs
app.post("/ai/emergency-trigger", (req, res) => {
  const { patientId, type } = req.body;
  if (!patientId || !type) return res.status(400).json({ error: "Missing data" });

  // Trigger emergency logic
  triggerEmergency(patientId, type);

  res.json({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
