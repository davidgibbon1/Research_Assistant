import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Divider, Container } from '@mui/material';
import ChatMessage from '../components/Chat/ChatMessage';
import ChatInput from '../components/Chat/ChatInput';

// Mock data for initial chat
const initialMessages = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your research assistant. How can I help with your research and citations today?',
    timestamp: new Date(),
    sources: [],
  },
];

/**
 * Chat page component with RAG-based research assistant
 */
function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    // Add user message to the chat
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to the backend
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I'll help you research that. Here's what I found about "${content}"...`,
          timestamp: new Date(),
          sources: [
            {
              title: 'Research Methods in Psychology',
              authors: ['Smith, J.', 'Johnson, A.'],
              year: '2022',
              id: 'doc123',
            },
            {
              title: 'Citation Styles Guide',
              authors: ['Brown, R.'],
              year: '2021',
              id: 'doc456',
            },
          ],
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      
      // Add an error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        error: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          mt: 2,
        }}
      >
        <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h6">Research Assistant Chat</Typography>
        </Box>
        
        <Divider />
        
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isUser={message.role === 'user'}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </Box>
      </Paper>
    </Container>
  );
}

export default Chat; 