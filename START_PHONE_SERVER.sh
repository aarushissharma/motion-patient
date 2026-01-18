#!/bin/bash
# Quick start script for phone connection server

echo "🚀 Starting Motion-Patient Server for Phone Connection..."
echo ""

cd "$(dirname "$0")"
python3 serve_for_phone.py
