import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import ChatWindow from './ChatWindow';
import '../styles/ChatbotPanel.css';

const ChatbotPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          className="chatbot-floating-btn"
          onClick={() => setIsOpen(true)}
          title="Open AI Assistant"
        >
          <FiMessageCircle size={24} />
        </Button>
      )}

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          <div className="panel-close-btn">
            <Button
              variant="light"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="close-btn"
              title="Close"
            >
              <FiX size={20} />
            </Button>
          </div>
          <ChatWindow />
        </div>
      )}
    </>
  );
};

export default ChatbotPanel;
