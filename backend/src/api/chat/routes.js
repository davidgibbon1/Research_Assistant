const express = require('express');
const router = express.Router();
const chatService = require('../../services/chat');

/**
 * @route POST /api/chat
 * @desc Send a message to the RAG-powered chat assistant
 * @access Private
 */
router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;
    const userId = req.user.id; // Assuming middleware sets req.user

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const response = await chatService.processMessage(message, history, userId);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route GET /api/chat/history
 * @desc Get chat history for a user
 * @access Private
 */
router.get('/history', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming middleware sets req.user
    const history = await chatService.getChatHistory(userId);
    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 