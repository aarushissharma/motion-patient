function speak(text){
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    peechSynthesis.speak(u);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new SpeechRecognition();
recognizer.lang = "en-US";
recognizer.interimResults = false;
recognizer.maxAlternatives = 1;

let listeningUser = false;

async function askGemini(messages) {
    try {
        const res = await fetch("/api/gemini-chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: SON.stringify({ messages })
        });
        const { text } = await res.json();
        return text;
    } 
    catch (err) {
        console.error("Gemini API error:", err);
        return "I'm having trouble understanding right now.";
    }
}

export function startGeminiFallCheckIn() {
    if (listeningUser) return;

    const initialPrompt = "I noticed you fell. Are you okay?";
    speak(initialPrompt);

    recognizer.onend = () => recognizer.start();
    recognizer.start();
    listeningUser = true;
} 

recognizer.onresult = async (event) => {
    listeningUser = false;

    const userSpeech = event.results[0][0].transcript;
    console.log("Patient said:", userSpeech);

    const messages = [
        { role: "system", content: "You are a caring virtual assistant for a fall detection system." },
        { role: "user", content: `Patient said: "${userSpeech}". Respond helpfully.` }
    ];

    const geminiResponse = await askGemini(messages);
    console.log("Gemini replied:", geminiResponse);

    speak(geminiResponse);
};

recognizer.onerror = (event) => {
    console.error("Recognition error:", event.error);
    speak("I couldn't hear that clearly. Could you repeat, please?");
};

