import React from 'react';
import { Paper, Typography, Avatar, Box, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { Person, SmartToy } from '@mui/icons-material';

// Styled components
const MessagePaper = styled(Paper)(({ theme, isUser }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: isUser ? theme.palette.primary.light : theme.palette.background.paper,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: theme.spacing(2),
  maxWidth: '80%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
}));

const SourceChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-label': {
    fontSize: '0.7rem',
  },
}));

const MarkdownContent = styled('div')(({ theme }) => ({
  '& p': {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  '& p:last-child': {
    marginBottom: 0,
  },
  '& a': {
    color: theme.palette.primary.main,
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: '2px 4px',
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  '& pre': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(1),
    borderRadius: 4,
    overflow: 'auto',
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
}));

/**
 * Component for displaying a single chat message
 */
function ChatMessage({ message, isUser }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      {!isUser && (
        <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}>
          <SmartToy />
        </Avatar>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <MessagePaper isUser={isUser} elevation={1}>
          {isUser ? (
            <Typography>{message.content}</Typography>
          ) : (
            <MarkdownContent>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </MarkdownContent>
          )}
        </MessagePaper>
        
        {!isUser && message.sources && message.sources.length > 0 && (
          <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mt: 0.5 }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              Sources:
            </Typography>
            {message.sources.map((source, index) => (
              <SourceChip
                key={index}
                label={`${source.title} (${source.year})`}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        )}
      </Box>
      {isUser && (
        <Avatar sx={{ bgcolor: 'primary.main', ml: 1 }}>
          <Person />
        </Avatar>
      )}
    </Box>
  );
}

export default ChatMessage; 