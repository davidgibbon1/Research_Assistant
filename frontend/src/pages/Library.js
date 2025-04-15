import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  TextField,
  InputAdornment,
  Divider,
  Card,
  CardContent,
  CardActions,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  PictureAsPdf, 
  Person, 
  CalendarToday, 
  Folder 
} from '@mui/icons-material';

// Mock data for papers
const mockPapers = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
    year: '2017',
    journal: 'Advances in Neural Information Processing Systems',
    folder: 'Machine Learning',
    abstract: 'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely...'
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    year: '2018',
    journal: 'arXiv preprint',
    folder: 'NLP',
    abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers...'
  },
  {
    id: '3',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    year: '2016',
    journal: 'IEEE Conference on Computer Vision and Pattern Recognition',
    folder: 'Computer Vision',
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously...'
  }
];

// Mock data for folders
const mockFolders = [
  { id: '1', name: 'All Papers', count: 3 },
  { id: '2', name: 'Machine Learning', count: 1 },
  { id: '3', name: 'NLP', count: 1 },
  { id: '4', name: 'Computer Vision', count: 1 },
  { id: '5', name: 'Unorganized', count: 0 }
];

function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('1');
  const [papers, setPapers] = useState(mockPapers);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Library
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ ml: 2 }}
        >
          Add Paper
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search papers by title, author, or content..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {/* Folders sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Folders
            </Typography>
            <List>
              {mockFolders.map((folder) => (
                <ListItem 
                  button 
                  key={folder.id}
                  selected={selectedFolder === folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <ListItemIcon>
                    <Folder color={selectedFolder === folder.id ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary={folder.name} />
                  <Chip 
                    label={folder.count} 
                    size="small" 
                    color={selectedFolder === folder.id ? 'primary' : 'default'} 
                    variant={selectedFolder === folder.id ? 'filled' : 'outlined'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Papers grid */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {mockFolders.find(f => f.id === selectedFolder)?.name || 'All Papers'}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              {papers.length > 0 ? (
                papers.map((paper) => (
                  <Grid item xs={12} key={paper.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <PictureAsPdf />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" component="div">
                              {paper.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Person fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {paper.authors.join(', ')}
                              </Typography>
                              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                              <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {paper.year}
                              </Typography>
                              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                              <Folder fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {paper.folder}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                          {paper.abstract}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Open</Button>
                        <Button size="small">Cite</Button>
                        <Button size="small">Chat</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center" sx={{ py: 4 }}>
                    No papers found. Add some papers to your library.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Library; 