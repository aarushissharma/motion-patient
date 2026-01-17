const permissionBtn = document.getElementById("permissionBtn");

let fallCooldown = false;
const FALL_COOLDOWN_MS = 2000; // 2 seconds lock

let recentMagnitudes = [];
const WINDOW_SIZE = 10; // ~0.3–0.5s depending on device
let motionCallback = null;

// Public function for main.js to register callback
function startMotionTracking(callback) {
  motionCallback = callback;
}

// Utility to calculate vector magnitude
function calculateMagnitude(acc) {
  return Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
}

// Motion event handler
function handleMotion(event) {
  const acc = event.accelerationIncludingGravity;
  if (!acc) return;

  const magnitude = calculateMagnitude(acc);

  // Update rolling window
  recentMagnitudes.push(magnitude);
  if (recentMagnitudes.length > WINDOW_SIZE) {
    recentMagnitudes.shift();
  }

  // Determine event type
  let eventType = "NORMAL";
  const maxRecent = Math.max(...recentMagnitudes);
  const avgRecent = recentMagnitudes.reduce((a, b) => a + b, 0) / recentMagnitudes.length;

  const FALL_THRESHOLD = 20;
  const SLOW_DESCENT_THRESHOLD = 10;


  if (maxRecent > FALL_THRESHOLD && avgRecent < SLOW_DESCENT_THRESHOLD) {
    eventType = "FALL";
  } else if (avgRecent > SLOW_DESCENT_THRESHOLD && maxRecent < FALL_THRESHOLD) {
    eventType = "SLOW DESCENT";
  }

  if (eventType === "FALL" && !fallCooldown) {
    fallCooldown = true;
    setTimeout(() => (fallCooldown = false), FALL_COOLDOWN_MS);
} else if (eventType === "FALL" && fallCooldown) {
// Prevent duplicate fall during cooldown
    eventType = "NORMAL";
}


  // Send data to main.js
  if (motionCallback) {
    motionCallback({
      ax: acc.x,
      ay: acc.y,
      az: acc.z,
      magnitude,
      eventType
    });
  }
}

// Request motion permission and start tracking
async function enableMotion() {
  try {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      const response = await DeviceMotionEvent.requestPermission();

      if (response === "granted") {
        permissionBtn.style.display = "none";
        window.addEventListener("devicemotion", handleMotion);
      } else {
        alert("Motion permission denied.");
      }
    } else {
      // Older iOS / desktop fallback
      permissionBtn.style.display = "none";
      window.addEventListener("devicemotion", handleMotion);
    }
  } catch (err) {
    console.error(err);
    alert(
      "Motion access is unavailable on this device. Make sure you're using Safari and not a restricted device."
    );
  }
}

// Expose globally so main.js can call it
window.startMotionTracking = startMotionTracking;

// Hook button click
permissionBtn.addEventListener("click", enableMotion);