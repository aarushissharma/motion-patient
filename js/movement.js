const permissionBtn = document.getElementById("permissionBtn");
const permissionHelp = document.getElementById("permissionHelp");

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

  const FALL_THRESHOLD = 23;
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
      // iOS 13+ requires explicit permission
      const response = await DeviceMotionEvent.requestPermission();

      if (response === "granted") {
        permissionBtn.style.display = "none";
        window.addEventListener("devicemotion", handleMotion);
        console.log("✅ Motion permission granted!");
      } else if (response === "denied") {
        console.error("❌ Motion permission denied by user");
        permissionBtn.textContent = "Permission Denied - Tap for Help";
        permissionBtn.style.backgroundColor = "#ef4444";
        
        // Show help text
        if (permissionHelp) {
          permissionHelp.style.display = "block";
        }
        
        // Show detailed instructions
        const instructions = `Motion permission denied. To fix:\n\n` +
          `iOS 13+:\n` +
          `1. Settings → Privacy & Security → Motion & Fitness\n` +
          `2. Make sure it's ON\n\n` +
          `OR\n\n` +
          `1. Close Safari completely (swipe up, swipe Safari away)\n` +
          `2. Reopen Safari\n` +
          `3. Come back here and try again\n\n` +
          `OR\n\n` +
          `1. Settings → Safari → Advanced → Website Data\n` +
          `2. Delete data for this site\n` +
          `3. Refresh and try again`;
        
        alert(instructions);
        
        // Make button clickable to show help again
        permissionBtn.onclick = function() {
          alert(instructions);
        };
      } else {
        // Prompt was dismissed
        permissionBtn.textContent = "Tap to Enable Motion";
        console.log("Permission prompt dismissed");
      }
    } else {
      // Older iOS / desktop / Android - no permission required
      permissionBtn.style.display = "none";
      window.addEventListener("devicemotion", handleMotion);
      console.log("✅ Motion tracking started (no permission required)");
    }
  } catch (err) {
    console.error("Motion permission error:", err);
    
    // Try to add listener anyway (some browsers don't need permission)
    try {
      window.addEventListener("devicemotion", handleMotion);
      permissionBtn.style.display = "none";
      console.log("✅ Motion tracking started (fallback method)");
    } catch (fallbackErr) {
      console.error("Fallback also failed:", fallbackErr);
      permissionBtn.textContent = "Not Supported";
      permissionBtn.style.backgroundColor = "#ef4444";
      alert(
        "Motion access not available on this device.\n\n" +
        "Try:\n" +
        "1. Use Safari on iOS or Chrome on Android\n" +
        "2. Make sure you're on a real device (not simulator)\n" +
        "3. Check if your device supports motion sensors"
      );
    }
  }
}

// Expose globally so main.js can call it
window.startMotionTracking = startMotionTracking;

// Hook button click
permissionBtn.addEventListener("click", enableMotion);