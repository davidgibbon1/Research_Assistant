const { LangChainService } = require('./langchain');

class ChatService {
  constructor() {
    this.langchain = new LangChainService();
  }

  /**
   * Process a user message using RAG
   * @param {string} message - The user's message
   * @param {Array} history - Chat history
   * @param {string} userId - User ID
   * @returns {Object} - The response
   */
  async processMessage(message, history = [], userId) {
    try {
      // 1. Retrieve relevant documents based on the user query
      const relevantDocs = await this.langchain.retrieveRelevantDocuments(message, userId);
      
      // 2. Format chat history and context for the LLM
      const formattedHistory = this._formatChatHistory(history);
      
      // 3. Generate a response using the LLM with retrieved documents as context
      const response = await this.langchain.generateResponse(message, formattedHistory, relevantDocs);
      
      // 4. Save the interaction to chat history
      await this._saveChatInteraction(userId, message, response);
      
      return {
        message: response,
        sources: this._extractSources(relevantDocs),
      };
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  /**
   * Get chat history for a user
   * @param {string} userId - User ID
   * @returns {Array} - Chat history
   */
  async getChatHistory(userId) {
    // This would typically interact with a database
    // For now we'll return a placeholder
    return [
      { role: 'system', content: 'How can I help with your research today?' },
      { role: 'user', content: 'Example message' },
      { role: 'assistant', content: 'Example response' },
    ];
  }

  /**
   * Format chat history for the LLM
   * @param {Array} history - Chat history
   * @returns {string} - Formatted history
   * @private
   */
  _formatChatHistory(history) {
    if (!history || history.length === 0) {
      return '';
    }

    return history
      .map((msg) => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }

  /**
   * Save a chat interaction to the database
   * @param {string} userId - User ID
   * @param {string} userMessage - User message
   * @param {string} assistantResponse - Assistant response
   * @returns {Promise<void>}
   * @private
   */
  async _saveChatInteraction(userId, userMessage, assistantResponse) {
    // This would typically save to a database
    console.log(`Saving chat interaction for user ${userId}`);
  }

  /**
   * Extract source information from retrieved documents
   * @param {Array} documents - Retrieved documents
   * @returns {Array} - Sources
   * @private
   */
  _extractSources(documents) {
    if (!documents || documents.length === 0) {
      return [];
    }

    return documents.map((doc) => ({
      title: doc.metadata.title || 'Unknown',
      authors: doc.metadata.authors || [],
      year: doc.metadata.year || '',
      id: doc.metadata.id || '',
    }));
  }
}

module.exports = new ChatService(); 