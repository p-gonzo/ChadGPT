import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { Container, Typography, TextField, Button } from '@mui/material';

const ENDPOINT = 'http://localhost:3000';

const ChatInterface = ( { config } ) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [streamingResponse, setStreamingResponse] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, streamingResponse]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('result', ({request, response}) => {
      if (response.token) setStreamingResponse(prevStreamingResponse => prevStreamingResponse + response.token);
      if (response.token === null) {
        let currentlyStreamedResponse = '';
        setStreamingResponse(prevStreamingResponse => {
          currentlyStreamedResponse = prevStreamingResponse;
          return '';
        });
        setChatHistory(prevChatHistory => [...prevChatHistory, currentlyStreamedResponse]);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      const socket = socketIOClient(ENDPOINT);
      const id = "TS-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
      const model = config.models[0]; // Fix me
      const payload = { ...config, id, model, 'prompt': message  };
      socket.emit('request', payload );
      setChatHistory(prevChatHistory => [...prevChatHistory, message]);
      setMessage('');
    }
  };

  const chatHistoryStyle = {
    overflowY: "scroll",
    height: "25vh"
  }

  return (
    <Container maxWidth="sm">
      <div style={chatHistoryStyle}>
        {chatHistory.map((chatMessage, index) => (
          <Typography key={index} variant="body1">{chatMessage}</Typography>
        ))}
        <Typography key='stream' variant="body1">{streamingResponse}</Typography>
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">Cha(d)t</Button>
      </form>
    </Container>
  );
}

export default ChatInterface;