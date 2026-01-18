#!/bin/bash

echo "🔍 Finding your computer's IP address..."
echo ""

# Try to get IP address
IP=$(ipconfig getifaddr en0 2>/dev/null)
if [ -z "$IP" ]; then
  IP=$(ipconfig getifaddr en1 2>/dev/null)
fi

if [ -z "$IP" ]; then
  echo "❌ Could not automatically detect IP address"
  echo ""
  echo "Please run this command manually:"
  echo "  ipconfig getifaddr en0"
  echo ""
  echo "Then use that IP in the URL below"
  exit 1
fi

echo "✅ Found your IP address: $IP"
echo ""
echo "=" 
echo "📱 ON YOUR PHONE, OPEN THIS URL:"
echo "=" 
echo ""
echo "   http://$IP:8080"
echo ""
echo "=" 
echo ""
echo "💻 DASHBOARD ON YOUR COMPUTER:"
echo "   http://localhost:3000"
echo ""
echo "🚀 TO START THE SERVER, RUN:"
echo "   cd /Users/riddhi/Downloads/motion-patient-main"
echo "   python3 serve_for_phone.py"
echo ""
