import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

const config = {
  seed: -1,
  threads: 4,
  n_predict: 200,
  top_k: 40,
  top_p: 0.9,
  temp: 0.1,
  repeat_last_n: 64,
  repeat_penalty: 1.3,
  debug: false,
  models: []
}

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