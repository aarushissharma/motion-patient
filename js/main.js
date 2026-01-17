const fallLog = [];
const logEl = document.getElementById("fallLog");

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

  if (data.eventType === "FALL") {
    const now = new Date();
    fallLog.push({
      time: now.toLocaleTimeString(),
      magnitude: data.magnitude.toFixed(2),
    });

    // Keep only last 5 events for UI
    const recentFalls = fallLog.slice(-5);

    logEl.innerHTML = recentFalls
      .map(
        (f) =>
          `<div>⚠️ Fall at ${f.time} (mag ${f.magnitude})</div>`
      )
      .join("");
  }
});
