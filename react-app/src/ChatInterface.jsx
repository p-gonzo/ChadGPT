import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('chat message', (newMessage) => {
      setChatHistory([...chatHistory, newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  }, [chatHistory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      const socket = socketIOClient(ENDPOINT);
      socket.emit('chat message', message);
      setMessage('');
      socket.disconnect();
    }
  };

  return (
    <div>
      <h1>Chat Interface</h1>
      <div>
        {chatHistory.map((chatMessage, index) => (
          <p key={index}>{chatMessage}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatInterface;