// main.js
import { startOpenAIFallCheckIn } from "./ai-openai.js";

const statusCard = document.getElementById("statusCard");
const statusText = document.getElementById("statusText");
const statusSub = document.getElementById("statusSub");
const meterFill = document.getElementById("meterFill");
const debugEl = document.getElementById("debug");
const fallLog = document.getElementById("fallLog");

document.getElementById("callCaregiverBtn").addEventListener("click", () => {
  fetch("http://localhost:3000/ai/emergency-trigger", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientId: "john123",
      type: "caregiver"
    })
  })
    .then(() => alert("Caregiver has been contacted!"))
    .catch((err) => console.error("Emergency trigger error:", err));
});

startMotionTracking((data) => {
  statusText.innerText = data.eventType;
  statusSub.innerText = "Magnitude: " + data.magnitude.toFixed(2);

  statusCard.classList.remove("normal", "slow", "fall");
  if (data.eventType === "NORMAL") statusCard.classList.add("normal");
  else if (data.eventType === "SLOW DESCENT") statusCard.classList.add("slow");
  else if (data.eventType === "FALL") {
    statusCard.classList.add("fall");

    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.innerText = `${timestamp} - FALL detected!`;
    fallLog.prepend(logEntry);

    //OpenAI trigger
    startOpenAIFallCheckIn(
      `Fall detected in living room! `
    );
  }

  let meterPercent = Math.min((data.magnitude / 30) * 100, 100);
  meterFill.style.width = meterPercent + "%";

  debugEl.innerText = `
X: ${data.ax.toFixed(2)}
Y: ${data.ay.toFixed(2)}
Z: ${data.az.toFixed(2)}

Magnitude: ${data.magnitude.toFixed(2)}
Event: ${data.eventType}
  `;
});

window.startOpenAIFallCheckIn = startOpenAIFallCheckIn;