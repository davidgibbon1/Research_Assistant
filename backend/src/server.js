const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define fallback port
const PORT = process.env.PORT || 5000;

try {
  const app = require('./app');
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('Error starting server:', err.message);
  console.log('Creating a minimal app for development...');
  
  // Create a minimal express app if app.js fails to load
  const express = require('express');
  const app = express();
  
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Development server running' });
  });
  
  app.get('/', (req, res) => {
    res.status(200).json({ 
      message: 'Backend development server is running',
      status: 'Some dependencies may be missing. Please check the console for errors.' 
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Development server running on port ${PORT}`);
  });
}
