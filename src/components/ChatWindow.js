import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ChatMessage from './ChatMessage';
import chatbotService from '../services/chatbotService';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! 👋 I'm your Student Management Assistant. I can help you with:
        • Managing student records
        • Getting student information
        • Answering questions about your student database
        
Feel free to ask me anything!`,
      isUser: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId] = useState(generateConversationId());
  const [contextMode, setContextMode] = useState(true);
  const messagesEndRef = useRef(null);

  function generateConversationId() {
    return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      toast.warning('Please enter a message');
      return;
    }

    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      text: inputMessage,
      isUser: true
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      // Call appropriate endpoint based on context mode
      const response = contextMode
        ? await chatbotService.sendChatWithContext(inputMessage, conversationId)
        : await chatbotService.sendChat(inputMessage, conversationId);

      if (response.success) {
        const botMsg = {
          id: Date.now() + 1,
          text: response.botResponse,
          isUser: false
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        toast.error(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response from chatbot. Check if the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: `Hi! 👋 I'm your Student Management Assistant. I can help you with:
        • Managing student records
        • Getting student information
        • Answering questions about your student database
        
Feel free to ask me anything!`,
        isUser: false
      }
    ]);
    chatbotService.clearConversation(conversationId);
    toast.success('Chat cleared');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="header-content">
          <h5 className="mb-0">🤖 AI Assistant</h5>
          <small className="text-muted">Student Management Helper</small>
        </div>
        <div className="header-actions">
          <div className="form-check form-switch me-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="contextToggle"
              checked={contextMode}
              onChange={(e) => setContextMode(e.target.checked)}
              title={contextMode ? 'Using student database context' : 'General chat mode'}
            />
            <label className="form-check-label" htmlFor="contextToggle">
              <small>{contextMode ? 'With Context' : 'General'}</small>
            </label>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && (
          <div className="chat-message bot-message">
            <Spinner animation="grow" size="sm" className="me-2" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <Form onSubmit={handleSendMessage} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Ask me about students..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={loading}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSendMessage(e);
              }
            }}
          />
          <Button variant="primary" type="submit" disabled={loading} size="sm">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FiSend />
            )}
          </Button>
        </Form>
        <div className="chat-footer mt-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleClearChat}
            className="w-100"
          >
            Clear Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
