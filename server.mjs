import dotenv from "dotenv";
dotenv.config();

import express from "express";


import OpenAI from "openai";


console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("AI server is running");
});

app.post("/ai/patient-alert", async (req, res) => {
  const { name, event, location, heartRate } = req.body;

  const prompt = `
You are a calm, gentle AI assistant helping an Alzheimer’s patient.

Patient name: ${name}
Event: ${event}
Location: ${location}
Heart rate: ${heartRate}

Speak directly to the patient.
- Reassure them
- Ask simple yes/no questions
- Give clear, short instructions
- Keep sentences under 12 words
- Sound calm and supportive

Respond ONLY with what you would say out loud.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const aiMessage = completion.choices[0].message.content;

    res.json({ spokenMessage: aiMessage });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "AI failed", details: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
