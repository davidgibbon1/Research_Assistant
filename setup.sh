#!/bin/bash

# Display welcome message
echo "Setting up Research Assistant project..."

# Install concurrently globally to ensure it's available
echo "Installing concurrently globally..."
npm install -g concurrently

# Install cross-env globally to ensure it's available
echo "Installing cross-env globally..."
npm install -g cross-env

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Copy environment files if they don't exist
if [ ! -f ./backend/.env ]; then
  echo "Creating backend .env file from example..."
  cp ./backend/.env.example ./backend/.env
fi

if [ ! -f ./frontend/.env ]; then
  echo "Creating frontend .env file from example..."
  cp ./frontend/.env.example ./frontend/.env
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p uploads

# Install Electron-specific dependencies
echo "Installing Electron-specific dependencies..."
npm install --save-dev electron electron-builder
npm install --save electron-is-dev

echo "Setup complete! You can now run the desktop application with:"
echo "npm run dev" 