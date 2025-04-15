import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Send, Attachment } from '@mui/icons-material';

/**
 * Component for chat input with message sending functionality
 */
function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit} 
      elevation={3}
      sx={{ 
        p: 1, 
        display: 'flex', 
        alignItems: 'center',
        borderRadius: 2,
        mb: 2
      }}
    >
      <IconButton color="primary" aria-label="attach file" component="label">
        <input hidden accept="application/pdf" type="file" />
        <Attachment />
      </IconButton>
      
      <TextField
        fullWidth
        multiline
        maxRows={4}
        variant="standard"
        placeholder="Ask a question about your research..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        InputProps={{
          disableUnderline: true,
          endAdornment: isLoading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        }}
        sx={{
          ml: 1,
          mr: 1,
        }}
      />
      
      <IconButton 
        color="primary" 
        aria-label="send message"
        type="submit"
        disabled={!message.trim() || isLoading}
      >
        <Send />
      </IconButton>
    </Paper>
  );
}

export default ChatInput; 