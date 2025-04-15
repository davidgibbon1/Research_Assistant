import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, Snackbar, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

// Import pages (to be created)
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Search from './pages/Search';
import Chat from './pages/Chat';
import PDFViewer from './pages/PDFViewer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Import components
import Layout from './components/Layout/Layout';

// Check if we're running in Electron
const isElectron = window.navigator.userAgent.toLowerCase().indexOf('electron') > -1;

// Theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [backendStatus, setBackendStatus] = useState({ checking: true, available: false });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        // For both web and Electron, check if the backend is available
        const response = await axios.get('http://localhost:5000/health', { timeout: 5000 });
        if (response.status === 200) {
          setBackendStatus({ checking: false, available: true });
        } else {
          setBackendStatus({ checking: false, available: false });
          setErrorMessage('Backend server responded with an error');
        }
      } catch (error) {
        console.error('Backend check failed:', error);
        setBackendStatus({ checking: false, available: false });
        setErrorMessage('Could not connect to backend server');
      }
    };

    // In Electron, we can also check using the IPC bridge
    if (isElectron && window.api) {
      window.api.send('backend-status');
      window.api.receive('backend-status-reply', (status) => {
        setBackendStatus({ checking: false, available: status.running });
        if (!status.running) {
          setErrorMessage('Backend server is not running in Electron');
        }
      });
    }

    checkBackendStatus();
    
    // Set an interval to periodically check the backend status
    const interval = setInterval(checkBackendStatus, 10000);
    
    return () => clearInterval(interval);
  }, []);

  if (backendStatus.checking) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        <CircularProgress size={60} />
        <Box sx={{ mt: 4 }}>Connecting to backend server...</Box>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar 
        open={!backendStatus.available} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage || 'Backend server is not available'}
        </Alert>
      </Snackbar>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="library" element={<Library />} />
            <Route path="search" element={<Search />} />
            <Route path="chat" element={<Chat />} />
            <Route path="pdf/:id" element={<PDFViewer />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
