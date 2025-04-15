const dotenv = require('dotenv');
const { OpenAI } = require('langchain/llms/openai');
const { VectorDBQAChain } = require('langchain/chains');
const { PromptTemplate } = require('langchain/prompts');
const { DocumentService } = require('./document');

// Load environment variables
dotenv.config();

/**
 * Service for LangChain RAG integration
 */
class LangChainService {
  constructor() {
    this.documentService = new DocumentService();
    this.model = new OpenAI({
      temperature: 0.2,
      modelName: 'gpt-4', // or any other model you prefer
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Retrieve relevant documents based on a query
   * @param {string} query - User query
   * @param {string} userId - User ID for custom retrieval
   * @returns {Array} - Retrieved documents
   */
  async retrieveRelevantDocuments(query, userId) {
    try {
      // Get the user's document collection
      const vectorStore = await this.documentService.getUserVectorStore(userId);
      
      // Search for relevant documents
      const documents = await vectorStore.similaritySearch(query, 5);
      
      return documents;
    } catch (error) {
      console.error('Error retrieving documents:', error);
      return [];
    }
  }

  /**
   * Generate a response using the LLM with retrieved documents as context
   * @param {string} query - User query
   * @param {string} chatHistory - Formatted chat history
   * @param {Array} documents - Retrieved documents
   * @returns {string} - Generated response
   */
  async generateResponse(query, chatHistory, documents) {
    try {
      // Create prompt with context from documents
      const context = this._formatDocumentsAsContext(documents);
      
      const promptTemplate = new PromptTemplate({
        template: `
You are a helpful research assistant that helps scholars and researchers.
Use the following pieces of context to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

CONTEXT:
{context}

CHAT HISTORY:
{chatHistory}

USER QUESTION: {query}

ASSISTANT RESPONSE:`,
        inputVariables: ['context', 'query', 'chatHistory'],
      });
      
      const prompt = await promptTemplate.format({
        context,
        query,
        chatHistory,
      });
      
      // Generate response
      const response = await this.model.call(prompt);
      
      return response.trim();
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I apologize, but I encountered an error while processing your request.';
    }
  }

  /**
   * Format documents as context string
   * @param {Array} documents - Retrieved documents
   * @returns {string} - Formatted context
   * @private
   */
  _formatDocumentsAsContext(documents) {
    if (!documents || documents.length === 0) {
      return 'No relevant documents found.';
    }

    return documents
      .map((doc, index) => {
        const metadata = doc.metadata || {};
        return `Document ${index + 1} [${metadata.title || 'Unknown'}]:
${doc.pageContent}
---`;
      })
      .join('\n\n');
  }
}

/**
 * Service for document management
 */
class DocumentService {
  constructor() {
    // This would be implemented with actual vector store integration
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

module.exports = {
  LangChainService,
  DocumentService,
}; 