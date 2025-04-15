const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { Document } = require('langchain/document');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');

/**
 * Service for document processing and management
 */
class DocumentService {
  constructor() {
    this.uploadsDir = path.join(__dirname, '../../uploads');
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  /**
   * Process a PDF file and extract text, metadata, and citations
   * @param {string} filePath - Path to the PDF file
   * @returns {Object} - Processed document data
   */
  async processPdf(filePath) {
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Read the PDF file
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);

      // Extract text
      const { text } = pdfData;
      
      // Extract metadata
      const metadata = this._extractMetadataFromPdf(pdfData);
      
      // Extract citations
      const citations = this._extractCitationsFromText(text);
      
      // Split text into chunks for embedding
      const textChunks = await this.splitTextIntoChunks(text, metadata);
      
      return {
        text,
        metadata,
        citations,
        textChunks,
      };
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw error;
    }
  }

  /**
   * Split text into chunks for embedding
   * @param {string} text - Full text content
   * @param {Object} metadata - Document metadata
   * @returns {Array} - Array of document chunks
   */
  async splitTextIntoChunks(text, metadata) {
    try {
      const textChunks = await this.textSplitter.splitText(text);
      
      // Convert to Document objects with metadata
      return textChunks.map((chunk) => new Document({
        pageContent: chunk,
        metadata: {
          ...metadata,
          chunk: true,
        },
      }));
    } catch (error) {
      console.error('Error splitting text:', error);
      return [];
    }
  }

  /**
   * Extract metadata from PDF
   * @param {Object} pdfData - PDF data from pdf-parse
   * @returns {Object} - Extracted metadata
   * @private
   */
  _extractMetadataFromPdf(pdfData) {
    const { info, metadata } = pdfData;
    
    // Basic metadata extraction
    const extractedMetadata = {
      title: info?.Title || 'Unknown Title',
      authors: this._parseAuthors(info?.Author),
      creationDate: info?.CreationDate,
      modificationDate: info?.ModDate,
      pageCount: pdfData.numpages,
    };
    
    return extractedMetadata;
  }

  /**
   * Parse authors from PDF metadata
   * @param {string} authorString - Author string from PDF metadata
   * @returns {Array} - Array of author names
   * @private
   */
  _parseAuthors(authorString) {
    if (!authorString) {
      return ['Unknown Author'];
    }
    
    // Simple parsing logic - would be more complex in real implementation
    return authorString
      .split(/,|;|and/)
      .map((author) => author.trim())
      .filter((author) => author.length > 0);
  }

  /**
   * Extract citations from text
   * @param {string} text - Text content
   * @returns {Array} - Extracted citations
   * @private
   */
  _extractCitationsFromText(text) {
    // This would be a complex parser in real implementation
    // For now, we'll use a simple regex to find citation-like patterns
    const citations = [];
    
    // Look for patterns like (Author, Year)
    const citationRegex = /\(([A-Za-z\s]+),\s*(\d{4})\)/g;
    let match;
    
    while ((match = citationRegex.exec(text)) !== null) {
      citations.push({
        author: match[1].trim(),
        year: match[2],
        text: match[0],
        position: match.index,
      });
    }
    
    return citations;
  }

  /**
   * Get vector store for a user
   * @param {string} userId - User ID
   * @returns {Object} - Vector store for the user
   */
  async getUserVectorStore(userId) {
    // This is a placeholder - would be implemented with actual vector store
    return {
      similaritySearch: async (query, k) => {
        // Mock response for now
        return [
          {
            pageContent: 'This is a sample document content about research methodologies.',
            metadata: {
              title: 'Research Methodologies in Social Science',
              authors: ['Smith, J.', 'Johnson, A.'],
              year: '2022',
              id: 'doc123',
            },
          },
          {
            pageContent: 'Citation management is crucial for academic writing and proper attribution.',
            metadata: {
              title: 'Citation Styles and Academic Integrity',
              authors: ['Brown, R.'],
              year: '2021',
              id: 'doc456',
            },
          },
        ];
      },
    };
  }
}

module.exports = { DocumentService }; 