import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  InputAdornment, 
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Mock data for search results
const mockResults = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
    year: '2017',
    journal: 'Advances in Neural Information Processing Systems',
    abstract: 'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely...',
    keywords: ['transformer', 'attention', 'neural networks', 'nlp'],
    citations: 45000
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    year: '2018',
    journal: 'arXiv preprint',
    abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers...',
    keywords: ['bert', 'transformers', 'language models', 'nlp'],
    citations: 28000
  },
  {
    id: '3',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    year: '2016',
    journal: 'IEEE Conference on Computer Vision and Pattern Recognition',
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously...',
    keywords: ['resnet', 'deep learning', 'computer vision', 'image recognition'],
    citations: 60000
  }
];

function Search() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Literature Search
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search for research papers
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search papers by title, author, keyword, or content..."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="date">Date (Newest)</MenuItem>
                <MenuItem value="citations">Citations</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
            >
              {isSearching ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {hasSearched && (
        <Box>
          {isSearching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  {results.length} results found for "{query}"
                </Typography>
              </Box>
              
              {results.length > 0 ? (
                <>
                  <Grid container spacing={2}>
                    {results.map((paper) => (
                      <Grid item xs={12} key={paper.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" component="div">
                              {paper.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                              {paper.authors.join(', ')} • {paper.year} • {paper.journal}
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {paper.abstract}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                              {paper.keywords.map((keyword, index) => (
                                <Chip 
                                  key={index} 
                                  label={keyword} 
                                  size="small" 
                                  variant="outlined" 
                                  clickable
                                />
                              ))}
                              <Chip 
                                label={`${paper.citations.toLocaleString()} citations`} 
                                size="small" 
                                color="primary" 
                                variant="outlined" 
                              />
                            </Box>
                          </CardContent>
                          <CardActions>
                            <Button size="small">View Details</Button>
                            <Button size="small">Download PDF</Button>
                            <Button size="small">Add to Library</Button>
                            <Button size="small">Cite</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination count={10} color="primary" />
                  </Box>
                </>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6">No results found</Typography>
                  <Typography variant="body1">
                    Try different keywords or broaden your search
                  </Typography>
                </Paper>
              )}
            </>
          )}
        </Box>
      )}
    </Container>
  );
}

export default Search; 