# Research Assistant

A RAG-based research and citation management application with chat functionality. This application combines the features of Endnote and Mendeley with modern AI capabilities for smarter research management.

## Features

- PDF document management and organization
- Automatic citation extraction and formatting
- Literature search functionality
- RAG-based chat assistant for research questions
- Reference management and bibliography generation
- Collaborative workspace for research teams
- Desktop application support via Electron

## Project Structure

```
Research-Assistant/
├── frontend/          # React-based web application
├── backend/           # Node.js API server with RAG capabilities
├── main.js            # Electron main process file
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB
- Python 3.8+ (for RAG components)

### Quick Setup

The easiest way to set up the project is to use the setup script:

```bash
# Make the script executable if needed
chmod +x setup.sh

# Run the setup script
./setup.sh
```

This will install all dependencies and set up the environment files.

### Running the Desktop Application

You can start the desktop application with a single command:

```bash
# Option 1: Using npm
npm run dev

# Option 2: Using the dev script
./dev.sh
```

This will launch both the backend server and the Electron desktop application.

### Running as a Web Application

If you prefer to run the application in a web browser:

```bash
npm run start
```

This will start both the backend server and the React web application.

### Manual Installation

If you prefer to install manually:

1. Install root dependencies:
   ```
   npm install
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

### Running Components Separately

1. Start the backend server:
   ```
   npm run start:backend
   ```

2. Start the frontend application:
   ```
   npm run start:frontend
   ```

3. Start the Electron app (requires the frontend to be running):
   ```
   npm run start:electron-dev
   ```

### Building the Desktop Application

To create a distributable package of the desktop application:

```bash
# First build the frontend
cd frontend && npm run build && cd ..

# Then package the Electron app
npm run package
```

This will create distributable files in the `dist` directory.

## Development Notes

- The application can run as both a web app and a desktop app using Electron
- The backend server is embedded in the desktop application
- All communication with the backend uses REST APIs

## License

MIT
