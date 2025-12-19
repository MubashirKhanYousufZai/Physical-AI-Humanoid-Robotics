import React, { useState } from 'react';
import styles from './Chat.module.css';

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: `bot-${Date.now()}`,
      text: "Hello! I'm the AI-powered RAG Chatbot. Ask questions from the Humanoid Robotics book!",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    // Add user message immediately
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    // Add thinking message while waiting for API
    setMessages((prev) => [...prev, { id: 'loading', text: 'Thinking...', sender: 'bot' }]);

    try {
      const response = await fetch('/api/book-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== 'loading'));

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `Error: ${response.status} ${response.statusText}`;
        setMessages((prev) => [...prev, { id: `bot-${Date.now()}`, text: `Error, try again! (Issue: ${errorMessage})`, sender: 'bot' }]);
        console.error('API Response Error:', errorMessage);
      } else {
        const data = await response.json();
        setMessages((prev) => [...prev, { id: `bot-${Date.now()}`, text: data.message, sender: 'bot' }]);
      }
    } catch (error) {
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== 'loading'));
      // Network/CORS/Fetch failure
      setMessages((prev) => [...prev, { id: `bot-${Date.now()}`, text: 'Network Error: Could not connect to the server API.', sender: 'bot' }]);
      console.error('Fetch Failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Chat;