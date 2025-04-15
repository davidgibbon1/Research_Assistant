#!/bin/bash

# Display welcome message
echo "Setting up Research Assistant project..."

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

echo "Setup complete! You can now run the application with:"
echo "npm run dev" 