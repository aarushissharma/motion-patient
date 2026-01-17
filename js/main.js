console.log("main.js loaded");

const debugEl = document.getElementById("debug");
const statusEl = document.getElementById("status");

startMotionTracking((data) => {
  debugEl.innerText = `
X: ${data.ax.toFixed(2)}
Y: ${data.ay.toFixed(2)}
Z: ${data.az.toFixed(2)}

Magnitude: ${data.magnitude.toFixed(2)}
Event: ${data.eventType}
  `;

  statusEl.innerText = "Status: " + data.eventType;

  if (data.eventType === "FALL") {
    statusEl.style.color = "red";
  } else if (data.eventType === "SLOW DESCENT") {
    statusEl.style.color = "orange";
  } else {
    statusEl.style.color = "green";
  }
});
