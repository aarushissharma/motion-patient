export async function startOpenAIFallCheckIn(patientMessage) {
  try {
    const response = await fetch("http://localhost:3000/ai/patient-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: "john123",
        name: "John",
        message: patientMessage
      })
    });

    const data = await response.json();

    if (data.spokenMessage) {
      displayAIResponse(data.spokenMessage);

      // Start listening to patient verbal response after AI speaks
      startVoiceResponseListener();
    }
  } catch (err) {
    console.error("OpenAI fetch error:", err);
  }
}

// Display AI message + emergency buttons
function displayAIResponse(message) {
  const fallLog = document.getElementById("fallLog");

  const aiEntry = document.createElement("div");
  aiEntry.classList.add("ai-message");
  aiEntry.innerText = "AI: " + message;

  // Add emergency buttons if not already present
  let btnContainer = document.getElementById("emergencyBtnContainer");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "emergencyBtnContainer";
    btnContainer.classList.add("ai-buttons");

    const call911Btn = document.createElement("button");
    call911Btn.innerText = "Call 911";
    call911Btn.onclick = () => sendEmergencyTrigger("911");

    const caregiverBtn = document.createElement("button");
    caregiverBtn.innerText = "Contact Caregiver";
    caregiverBtn.onclick = () => sendEmergencyTrigger("caregiver");

    btnContainer.appendChild(call911Btn);
    btnContainer.appendChild(caregiverBtn);
    document.body.appendChild(btnContainer);
  }

  fallLog.prepend(aiEntry);

  // Speak aloud
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.onend = () => {
    startVoiceResponseListener(); // start listening only after AI speaks
  };
  speechSynthesis.speak(utterance);
}

// Start speech recognition for patient verbal response
function startVoiceResponseListener() {
  if (!("webkitSpeechRecognition" in window)) return; // unsupported

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // one response at a time
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const lastResult = event.results[event.results.length - 1][0].transcript;
    console.log("Patient said:", lastResult);

    // Send patient verbal response to AI
    if (lastResult.trim() !== "") {
      startOpenAIFallCheckIn('Patient: ${lastResult}');
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.start();
}

// Send emergency action to server
function sendEmergencyTrigger(type) {
  fetch("http://localhost:3000/ai/emergency-trigger", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientId: "john123",
      type: type
    })
  })
    .then(() => {
      alert(`${type.toUpperCase()} triggered!`);
    })
    .catch((err) => console.error("Emergency trigger error:", err));
}
