import express from "express";
import fetch from "node-fetch"; // Node 18+ has fetch built-in
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/gemini-chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.gemini.ai/v1/chat", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();
    res.json({ text: data.outputText || data.text });
  } catch (err) {
    console.error("Gemini API call failed:", err);
    res.status(500).json({ error: "Failed to call Gemini API" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
