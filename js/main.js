const debugEl = document.getElementById("debug");
const statusEl = document.getElementById("status");

// This function is called by movement.js
function onMotionData(data) {
  debugEl.innerText = `
X: ${data.ax.toFixed(2)}
Y: ${data.ay.toFixed(2)}
Z: ${data.az.toFixed(2)}

Magnitude: ${data.magnitude.toFixed(2)}
Event: ${data.eventType}
  `;

  statusEl.innerText = "Status: " + data.eventType;

  // Update color
  statusEl.className = "";
  if (data.eventType === "Fall") statusEl.classList.add("fall");
  else if (data.eventType === "Slow Descent") statusEl.classList.add("slow");
  else statusEl.classList.add("normal");
}
