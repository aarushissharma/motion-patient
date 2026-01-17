const permissionBtn = document.getElementById("permissionBtn");

let motionCallback = null;

function startMotionTracking(callback) {
  motionCallback = callback;
}

let lastMagnitude = 0;

// Utility to calculate vector magnitude
function calculateMagnitude(acc) {
  return Math.sqrt(acc.x**2 + acc.y**2 + acc.z**2);
}

// Motion event handler
function handleMotion(event) {
  const acc = event.accelerationIncludingGravity;
  if (!acc) return;

  const magnitude = Math.sqrt(
    acc.x ** 2 + acc.y ** 2 + acc.z ** 2
  );

  let eventType = "NORMAL";

  if (magnitude > 25) {
    eventType = "FALL";
  } else if (magnitude > 12) {
    eventType = "SLOW DESCENT";
  }

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


  // Callback to main.js
  if (typeof onMotionData === "function") {
    onMotionData({
      ax: acc.x,
      ay: acc.y,
      az: acc.z,
      magnitude,
      eventType
    });
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
        alert(
          "Motion permission denied."
        );
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

if (motionCallback) {
  motionCallback({
    ax,
    ay,
    az,
    magnitude,
    eventType
  });
}
// Hook button click
permissionBtn.addEventListener("click", enableMotion);
