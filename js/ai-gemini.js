export async function startGeminiFallCheckIn(fallMessage) {
  try {
    const response = await fetch("/api/gemini-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a caring virtual assistant for patients." },
          { role: "user", content: fallMessage }
        ]
      })
    });

    const data = await response.json();
    const utterance = new SpeechSynthesisUtterance(data.text);
    window.speechSynthesis.speak(utterance);

  } catch (err) {
    console.error("AI voice check-in failed:", err);
  }
}


//delete this later - only for testing

async function testAI() {
  try {
    const response = await fetch("/api/gemini-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a virtual caregiver." },
          { role: "user", content: "I just fell and need help." }
        ]
      })
    });

    const data = await response.json();
    console.log("AI response:", data.text);

    // Optional: speak it out
    const utterance = new SpeechSynthesisUtterance(data.text);
    window.speechSynthesis.speak(utterance);

  } catch (err) {
    console.error("AI test failed:", err);
  }
}

// Hook the test button
document.getElementById("testAI").addEventListener("click", testAI);
