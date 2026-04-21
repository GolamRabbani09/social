#!/bin/bash

# Social Media App - Quick Start Script
# This script sets up and runs both backend and frontend

echo "🚀 Social Media App - Quick Start"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    OPEN_CMD="open"
else
    OPEN_CMD="xdg-open"
fi

# Backend Setup
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing Python packages..."
pip install -r requirements.txt > /dev/null 2>&1

# Run migrations
echo "Running migrations..."
python manage.py migrate > /dev/null 2>&1

# Go back to root
cd ..

# Frontend Setup
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend

# Install npm packages if needed
if [ ! -d "node_modules" ]; then
    echo "Installing Node packages..."
    npm install > /dev/null 2>&1
fi

cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "To start the application, run in two separate terminals:"
echo ""
echo -e "${YELLOW}Terminal 1 (Backend):${NC}"
echo "  cd backend && source venv/bin/activate && python manage.py runserver"
echo ""
echo -e "${YELLOW}Terminal 2 (Frontend):${NC}"
echo "  cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo -e "${BLUE}Admin Panel: http://localhost:8000/admin${NC}"
echo ""
