import 'dotenv/config';
import OpenAI from "openai";

export default async function handler(req, res) {
    try {
        const { messages } = req.body;
        const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

        const response = await client.chat.completions.create({
            model: "gemini-1.5",
            messages,
            temperature: 0.7,
            max_output_tokens: 200

        });
        res.status(200).json({ text: response.choices[0].message.content });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "API request failed."});

    }
}
