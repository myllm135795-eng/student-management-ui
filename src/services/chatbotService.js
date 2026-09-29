import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const CHATBOT_URL = `${API_BASE_URL}/chatbot`;

const chatbotService = {
  /**
   * Send a simple chat message without database context
   * @param {string} message - The user message
   * @param {string} conversationId - Optional conversation ID for multi-turn chat
   * @returns {Promise} Response with bot message
   */
  sendChat: async (message, conversationId = null) => {
    try {
      const payload = {
        message,
        ...(conversationId && { conversationId })
      };
      
      const response = await axios.post(`${CHATBOT_URL}/chat`, payload);
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  },

  /**
   * Send a chat message with student database context
   * @param {string} message - The user message
   * @param {string} conversationId - Optional conversation ID for multi-turn chat
   * @returns {Promise} Response with context-aware bot message
   */
  sendChatWithContext: async (message, conversationId = null) => {
    try {
      const payload = {
        message,
        ...(conversationId && { conversationId })
      };
      
      const response = await axios.post(`${CHATBOT_URL}/chat-with-context`, payload);
      return response.data;
    } catch (error) {
      console.error('Error sending context-aware chat:', error);
      throw error;
    }
  },

  /**
   * Clear conversation history
   * @param {string} conversationId - The conversation ID to clear
   * @returns {Promise} Response message
   */
  clearConversation: async (conversationId) => {
    try {
      const response = await axios.post(`${CHATBOT_URL}/clear/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing conversation:', error);
      throw error;
    }
  },

  /**
   * Check if a conversation exists
   * @param {string} conversationId - The conversation ID to check
   * @returns {Promise<boolean>} Whether conversation exists
   */
  conversationExists: async (conversationId) => {
    try {
      const response = await axios.get(`${CHATBOT_URL}/exists/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking conversation:', error);
      return false;
    }
  },

  /**
   * Check chatbot service health
   * @returns {Promise} Health status
   */
  health: async () => {
    try {
      const response = await axios.get(`${CHATBOT_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
};

export default chatbotService;
