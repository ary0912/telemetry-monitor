#!/bin/bash

# Quick start script for Telemetry Monitoring System

echo "🚀 Telemetry Monitoring System - Setup"
echo "======================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo "✅ Frontend dependencies installed"
echo ""

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm run build
cd ..
echo "✅ Frontend built"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To run locally:"
echo "  Terminal 1: cd backend && node server.js"
echo "  Terminal 2: cd frontend && npm run dev"
echo ""
echo "To deploy:"
echo "  1. Push to GitHub: git push origin main"
echo "  2. Follow DEPLOYMENT.md for Vercel & Railway setup"
echo ""
echo "API URLs:"
echo "  Local Backend:   http://localhost:8080"
echo "  Local Frontend:  http://localhost:3000"
echo ""
