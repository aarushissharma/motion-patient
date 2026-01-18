#!/usr/bin/env python3
"""
Simple HTTP server to serve motion-patient app for phone connection
Auto-detects local IP and serves the app with correct API configuration
"""

import http.server
import socketserver
import socket
import os
import re
from urllib.parse import urlparse, parse_qs

PORT = 8080

def get_local_ip():
    """Get the local IP address of this machine"""
    try:
        # Connect to a remote address to determine local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        # Fallback: try to get from network interfaces
        try:
            import subprocess
            result = subprocess.run(['ipconfig', 'getifaddr', 'en0'], 
                                  capture_output=True, text=True, timeout=2)
            if result.returncode == 0 and result.stdout.strip():
                return result.stdout.strip()
        except:
            pass
        return "localhost"

class MotionPatientHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Get the IP address from the request (the IP the phone sees)
        # This is more reliable than trying to detect it
        client_ip = self.client_address[0]
        server_ip = self.server.server_address[0]
        
        # Get local IP for API connection - use the IP the server is bound to
        # If server is bound to 0.0.0.0, we need to detect the actual IP
        local_ip = get_local_ip()
        
        # If we got the IP from the request host header, use that
        host_header = self.headers.get('Host', '')
        if host_header and ':' in host_header:
            # Extract IP from Host header (e.g., "169.233.235.205:8080")
            potential_ip = host_header.split(':')[0]
            # Only use if it's not localhost
            if potential_ip not in ['localhost', '127.0.0.1']:
                local_ip = potential_ip
        
        api_url = f"http://{local_ip}:5001"
        
        # Parse the request path
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # If requesting index.html, inject API URL configuration
        if path == '/' or path == '/index.html':
            try:
                # Read the original index.html
                if os.path.exists('index.html'):
                    with open('index.html', 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Inject API URL configuration script - MUST run before any other scripts
                    config_script = f"""
                    <script>
                    // AUTO-CONFIGURE API URL FOR PHONE CONNECTION
                    // This runs IMMEDIATELY before any other scripts
                    (function() {{
                        // Get IP from current URL (more reliable)
                        const currentHost = window.location.hostname;
                        const apiUrl = currentHost === 'localhost' || currentHost === '127.0.0.1' 
                            ? 'http://localhost:5001' 
                            : 'http://' + currentHost + ':5001';
                        
                        console.log('📱 [PHONE SERVER] Detected hostname:', currentHost);
                        console.log('📱 [PHONE SERVER] Auto-configuring API URL to:', apiUrl);
                        
                        // Force set the API URL immediately - OVERRIDE everything
                        localStorage.setItem('watchful_api_url', apiUrl);
                        
                        // Override any existing cached URL
                        const urlParams = new URLSearchParams(window.location.search);
                        if (urlParams.get('api_url')) {{
                            const paramUrl = urlParams.get('api_url');
                            console.log('📱 [PHONE SERVER] Using URL parameter:', paramUrl);
                            localStorage.setItem('watchful_api_url', paramUrl);
                        }}
                        
                        // Also set a global variable for immediate use
                        window.PHONE_API_URL = apiUrl;
                        console.log('✅ [PHONE SERVER] API URL configured:', apiUrl);
                        
                        // Force update UI immediately
                        window.addEventListener('DOMContentLoaded', function() {{
                            const apiUrlEl = document.getElementById('apiUrlValue');
                            if (apiUrlEl) {{
                                apiUrlEl.textContent = apiUrl;
                                console.log('✅ [PHONE SERVER] UI updated with API URL:', apiUrl);
                            }}
                        }});
                    }})();
                    </script>
                    """
                    
                    # Replace the hardcoded localhost script in the body
                    # Find and replace the inline script that sets localhost:5001
                    localhost_pattern = r"const correctUrl = 'http://localhost:' \+ correctPort;"
                    replacement = f"const correctUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5001' : 'http://' + window.location.hostname + ':5001'; // Auto-configured by phone server"
                    content = re.sub(localhost_pattern, replacement, content)
                    
                    # Also replace any hardcoded localhost:5001 references (but keep localhost for local access)
                    # Only replace if we're not on localhost
                    if 'localhost' not in host_header and '127.0.0.1' not in host_header:
                        content = content.replace("http://localhost:5001", api_url)
                        content = content.replace("'http://localhost:5001'", f"'{api_url}'")
                    
                    # Insert config script at the very beginning of <head>
                    if '<head>' in content:
                        content = content.replace('<head>', '<head>' + config_script)
                    elif '</head>' in content:
                        content = content.replace('</head>', config_script + '</head>')
                    else:
                        # If no head tag, add at the beginning
                        content = config_script + content
                    
                    # Send the modified content
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html; charset=utf-8')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
                    return
            except Exception as e:
                print(f"Error serving index.html: {e}")
        
        # For all other files, serve normally
        return super().do_GET()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.address_string()}] {format % args}")

def main():
    local_ip = get_local_ip()
    
    print("=" * 60)
    print("📱 Motion-Patient Phone Server")
    print("=" * 60)
    print(f"✅ Server starting on port {PORT}")
    print(f"✅ Detected local IP: {local_ip}")
    print()
    print("📱 On your phone, open:")
    print(f"   http://{local_ip}:{PORT}")
    print()
    print("💻 Dashboard on your computer:")
    print("   http://localhost:3000")
    print()
    print("🔧 Backend API URL (auto-configured):")
    print(f"   http://{local_ip}:5001")
    print()
    print("=" * 60)
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    print()
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MotionPatientHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped")

if __name__ == "__main__":
    main()
