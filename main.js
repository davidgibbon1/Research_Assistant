const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');
const fs = require('fs');

// Keep a global reference of the window objects
let mainWindow;
let backendProcess;

// Create the backend server
function startBackendServer() {
  console.log('Starting backend server...');
  
  // Check if we're in development or production
  const serverPath = path.join(__dirname, 'backend', 'src', 'server.js');
  
  // Start the backend using Node.js
  backendProcess = spawn('node', [serverPath], {
    stdio: 'pipe',
    env: { ...process.env, ELECTRON: true }
  });
  
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });
  
  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
    
    if (code !== 0 && !app.isQuitting) {
      dialog.showErrorBox(
        'Backend Server Error',
        `The backend server crashed. Please restart the application.`
      );
    }
  });
}

// Create the browser window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  // Load the app
  if (isDev) {
    // In development, use the React dev server
    mainWindow.loadURL('http://localhost:3000');
    
    // Open DevTools
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the build directory
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize the application
app.whenReady().then(() => {
  // Start the backend server first
  startBackendServer();
  
  // Wait a moment for the server to start
  setTimeout(() => {
    createWindow();
  }, 1000);
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Clean up backend process when quitting
app.on('before-quit', () => {
  app.isQuitting = true;
  
  if (backendProcess) {
    console.log('Terminating backend process...');
    // On Windows, spawn a process to kill the backend process tree
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', backendProcess.pid, '/f', '/t']);
    } else {
      backendProcess.kill('SIGINT');
    }
  }
});

// IPC Communication with the renderer process
ipcMain.on('backend-status', (event) => {
  if (backendProcess) {
    event.reply('backend-status-reply', { running: true });
  } else {
    event.reply('backend-status-reply', { running: false });
  }
}); 