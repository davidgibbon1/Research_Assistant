import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LibraryBooks, Description, Search, Chat } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Research Assistant
      </Typography>
      
      <Typography variant="body1" paragraph>
        Your AI-powered research and citation management tool. Browse your library, 
        chat with your research papers, and manage citations easily.
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper>
              <LibraryBooks fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2">
              Library
            </Typography>
            <Typography variant="body2">
              Manage your research papers and documents
            </Typography>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper>
              <Description fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2">
              Citations
            </Typography>
            <Typography variant="body2">
              Generate and manage citations and references
            </Typography>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper>
              <Search fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2">
              Search
            </Typography>
            <Typography variant="body2">
              Find papers and references in your library
            </Typography>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper>
              <Chat fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2">
              Chat
            </Typography>
            <Typography variant="body2">
              Ask questions about your research papers
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1">
            No recent activity to display. Start by uploading papers to your library.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Dashboard; 