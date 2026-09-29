import React from 'react';
import '../styles/ChatMessage.css';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
