import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Container, Typography, TextField, Button } from '@mui/material';

const ENDPOINT = 'http://localhost:3000';

const ChatInterface = ( { config } ) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [streamingResponse, setStreamingResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('result', ({request, response}) => {
      // setChatHistory([...chatHistory, response.token]);
      setStreamingResponse(prevStreamingResponse => prevStreamingResponse + response.token);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      const socket = socketIOClient(ENDPOINT);
      const id = "TS-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
      const model = config.models[0]; // Fix me
      const payload = { ...config, id, model, 'prompt': message  };
      // console.log(payload);
      socket.emit('request', payload );
      setChatHistory(prevChatHistory => [...prevChatHistory, message]);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <div>
        {chatHistory.map((chatMessage, index) => (
          <Typography key={index} variant="body1">{chatMessage}</Typography>
        ))}
        <Typography key='stream' variant="body1">{streamingResponse}</Typography>
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