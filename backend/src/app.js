const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Try to load route modules if they exist
try {
  // Attempt to connect to MongoDB if mongoose is available
  try {
    const mongoose = require('mongoose');
    
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/research-assistant', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
  } catch (mongooseErr) {
    console.warn('Mongoose not available, skipping database connection:', mongooseErr.message);
  }

  // Try to load routes if they exist
  try {
    const citationsRoutes = require('./api/citations/routes');
    app.use('/api/citations', citationsRoutes);
  } catch (err) {
    console.warn('Citations routes not available:', err.message);
    app.get('/api/citations', (req, res) => res.json({ message: 'Citations API stub' }));
  }

  try {
    const referencesRoutes = require('./api/references/routes');
    app.use('/api/references', referencesRoutes);
  } catch (err) {
    console.warn('References routes not available:', err.message);
    app.get('/api/references', (req, res) => res.json({ message: 'References API stub' }));
  }

  try {
    const papersRoutes = require('./api/papers/routes');
    app.use('/api/papers', papersRoutes);
  } catch (err) {
    console.warn('Papers routes not available:', err.message);
    app.get('/api/papers', (req, res) => res.json({ message: 'Papers API stub' }));
  }

  try {
    const searchRoutes = require('./api/search/routes');
    app.use('/api/search', searchRoutes);
  } catch (err) {
    console.warn('Search routes not available:', err.message);
    app.get('/api/search', (req, res) => res.json({ message: 'Search API stub' }));
  }

  try {
    const chatRoutes = require('./api/chat/routes');
    app.use('/api/chat', chatRoutes);
  } catch (err) {
    console.warn('Chat routes not available:', err.message);
    app.get('/api/chat', (req, res) => res.json({ message: 'Chat API stub' }));
  }

  try {
    const authRoutes = require('./api/auth/routes');
    app.use('/api/auth', authRoutes);
  } catch (err) {
    console.warn('Auth routes not available:', err.message);
    app.get('/api/auth', (req, res) => res.json({ message: 'Auth API stub' }));
  }

  try {
    const uploadRoutes = require('./api/upload/routes');
    app.use('/api/upload', uploadRoutes);
  } catch (err) {
    console.warn('Upload routes not available:', err.message);
    app.get('/api/upload', (req, res) => res.json({ message: 'Upload API stub' }));
  }

  // Serve static files from the uploads directory if it exists
  try {
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  } catch (err) {
    console.warn('Uploads directory not available:', err.message);
  }
} catch (err) {
  console.error('Error loading routes:', err);
}

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API information endpoint
app.get('/api', (req, res) => {
  res.status(200).json({ 
    message: 'Research Assistant API',
    version: '1.0.0',
    endpoints: [
      '/api/citations',
      '/api/references',
      '/api/papers',
      '/api/search',
      '/api/chat',
      '/api/auth',
      '/api/upload'
    ]
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
