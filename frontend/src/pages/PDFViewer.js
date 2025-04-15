import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Box, 
  Typography, 
  CircularProgress,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  ZoomIn, 
  ZoomOut, 
  NavigateNext, 
  NavigateBefore,
  Fullscreen,
  Chat,
  Description,
  TextFields
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer() {
  const { id } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // In a real app, fetch the PDF URL based on the ID
    // For now, use a sample PDF
    setPdfUrl('https://cors-anywhere.herokuapp.com/https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
    setIsLoading(false);
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Error Loading PDF
          </Typography>
          <Typography>{error}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Paper Title (ID: {id})
              </Typography>
              <Box>
                <Tooltip title="Extract Text">
                  <IconButton>
                    <TextFields />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Citations">
                  <IconButton>
                    <Description />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Chat with this Paper">
                  <IconButton>
                    <Chat />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fullscreen">
                  <IconButton>
                    <Fullscreen />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button onClick={goToPrevPage} disabled={pageNumber <= 1} sx={{ mr: 1 }}>
                <NavigateBefore />
              </Button>
              <Typography sx={{ alignSelf: 'center', mx: 2 }}>
                Page {pageNumber} of {numPages}
              </Typography>
              <Button onClick={goToNextPage} disabled={pageNumber >= numPages} sx={{ ml: 1 }}>
                <NavigateNext />
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Button onClick={zoomOut} sx={{ mx: 0.5 }}>
                <ZoomOut />
              </Button>
              <Button onClick={resetZoom} sx={{ mx: 0.5 }}>
                {Math.round(scale * 100)}%
              </Button>
              <Button onClick={zoomIn} sx={{ mx: 0.5 }}>
                <ZoomIn />
              </Button>
            </Box>
            
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                '& .react-pdf__Document': {
                  border: '1px solid #eee',
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 220px)',
                }
              }}
            >
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => setError('Error loading PDF: ' + error.message)}
                loading={<CircularProgress />}
              >
                <Page 
                  pageNumber={pageNumber} 
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Document Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle2">Authors</Typography>
            <Typography variant="body2" paragraph>
              Sample Author 1, Sample Author 2
            </Typography>
            
            <Typography variant="subtitle2">Publication Date</Typography>
            <Typography variant="body2" paragraph>
              January 2023
            </Typography>
            
            <Typography variant="subtitle2">Journal</Typography>
            <Typography variant="body2" paragraph>
              Sample Journal of Science
            </Typography>
            
            <Typography variant="subtitle2">Abstract</Typography>
            <Typography variant="body2" paragraph>
              This is a sample abstract for the PDF document being viewed. It would normally contain a summary of the paper's content and findings.
            </Typography>
            
            <Typography variant="subtitle2">Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              <Button size="small" variant="outlined">keyword1</Button>
              <Button size="small" variant="outlined">keyword2</Button>
              <Button size="small" variant="outlined">keyword3</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PDFViewer; 