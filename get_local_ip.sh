#!/bin/bash
echo "🔍 Finding your local IP address..."
echo ""
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
if [ -z "$IP" ]; then
  echo "❌ Could not find IP automatically"
  echo ""
  echo "Please run manually:"
  echo "  ipconfig getifaddr en0"
  echo "  or"
  echo "  ipconfig getifaddr en1"
else
  echo "✅ Your local IP address is: $IP"
  echo ""
  echo "📱 On your phone, open:"
  echo "   http://$IP:5001?api_url=http://$IP:5001"
  echo ""
  echo "💻 Dashboard on your computer:"
  echo "   http://localhost:3000"
fi
