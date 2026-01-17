// Request iOS motion permission
if (typeof DeviceMotionEvent.requestPermission === 'function') {
  DeviceMotionEvent.requestPermission()
    .then(state => state === 'granted' && window.addEventListener('devicemotion', handleMotion))
    .catch(console.error);
} else {
  window.addEventListener('devicemotion', handleMotion);
}

// Motion buffer
let motionBuffer = [];
const BUFFER_SIZE = 150;
let fallTriggered = false;

function handleMotion(event) {
  const ax = event.acceleration.x || 0;
  const ay = event.acceleration.y || 0;
  const az = event.acceleration.z || 0;

  const gx = event.rotationRate.alpha || 0;
  const gy = event.rotationRate.beta || 0;
  const gz = event.rotationRate.gamma || 0;

  const accelMag = Math.sqrt(ax*ax + ay*ay + az*az);
  const gyroMag = Math.sqrt(gx*gx + gy*gy + gz*gz);

  motionBuffer.push({ accel: accelMag, gyro: gyroMag, timestamp: Date.now() });
  if (motionBuffer.length > BUFFER_SIZE) motionBuffer.shift();

  document.getElementById('accel').textContent = accelMag.toFixed(2);
  document.getElementById('gyro').textContent = gyroMag.toFixed(2);

  detectFall();
}

function detectFall() {
  const peakAccel = Math.max(...motionBuffer.map(m => m.accel));
  const peakGyro = Math.max(...motionBuffer.map(m => m.gyro));

  if (!fallTriggered && peakAccel > 3.0 && peakGyro > 3.0) {
    triggerFall();
  }
}

function triggerFall() {
  fallTriggered = true;
  document.getElementById('status').textContent = "FALL DETECTED";

  const event = {
    event: "fall",
    timestamp: new Date().toISOString(),
    acceleration: Math.max(...motionBuffer.map(m => m.accel)),
    rotation: Math.max(...motionBuffer.map(m => m.gyro))
  };

  // send to backend
  fetch(BACKEND_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  }).catch(console.error);

  motionBuffer = [];
  setTimeout(() => fallTriggered = false, 3000);
}
