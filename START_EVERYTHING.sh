#!/bin/bash
# Start everything needed for phone connection

echo "🚀 Starting Motion-Patient Phone Connection Setup"
echo ""

# Get IP address
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)

if [ -z "$IP" ]; then
  echo "❌ Could not detect IP address automatically"
  echo "Please run: ipconfig getifaddr en0"
  exit 1
fi

echo "✅ Detected IP: $IP"
echo ""
echo "📱 On your phone, open:"
echo "   http://$IP:8080"
echo ""
echo "💻 Dashboard:"
echo "   http://localhost:3000"
echo ""
echo "Starting server..."
echo ""

cd "$(dirname "$0")"
python3 serve_for_phone.py
