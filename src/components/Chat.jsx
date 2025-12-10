import React, { useState } from 'react';
import styles from './Chat.module.css';

function Chat() {
  const [messages, setMessages] = useState([
    {
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
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    // Add thinking message while waiting for API
    setMessages((prev) => [...prev, { text: 'Thinking...', sender: 'bot', id: 'loading' }]);

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== 'loading'));

      if (!response.ok) {
        // Attempt to read JSON error body
        const errorBody = await response.text();
        let errorMessage = `Error: ${response.status} ${response.statusText}`;

        try {
          const jsonError = JSON.parse(errorBody);
          errorMessage = `Error, try again! (Issue: ${jsonError.error || 'Unknown Server Error'})`;
        } catch (e) {
          // Fallback if the body wasn't JSON (this is where the HTML 404 error was previously caught)
          errorMessage = `Error, try again! (Issue: Unexpected token '<', "${errorBody.substring(0, 15)}..." is not valid...)`;
        }
        
        setMessages((prev) => [...prev, { text: errorMessage, sender: 'bot' }]);
        console.error('API Response Error:', errorMessage);
        
      } else {
        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.answer, sender: 'bot' }]);
      }
    } catch (error) {
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== 'loading'));
      // Network/CORS/Fetch failure
      setMessages((prev) => [...prev, { text: 'Network Error: Could not connect to the server API.', sender: 'bot' }]);
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
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
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