import React, { useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

const ConfigEditor = ( { config, setConfig } ) => {

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('request',  { method: 'installed' });
    socket.on('result', ({request, response}) => {
      if (request.method !== 'installed') return;
      else {
        setConfig(prevConfig => ({ ...prevConfig, 'models': response.models }));
      }
      socket.disconnect();
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setConfig(prevConfig => ({ ...prevConfig, [name]: checked }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setConfig(prevConfig => ({ ...prevConfig, [name]: value }));
  };

  const configContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  };

  const configStyle = {
    width: "10%",
    minWidth: "100px"
  };

  const initialPromptStyle = {
    width: "50%"
  }

  return (
    <div style={configContainerStyle}>
      <TextField
        label="Seed"
        type="number"
        name="seed"
        value={config.seed}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="Threads"
        type="number"
        name="threads"
        value={config.threads}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="N Predict"
        type="number"
        name="n_predict"
        value={config.n_predict}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="Top K"
        type="number"
        name="top_k"
        value={config.top_k}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="Top P"
        type="number"
        step="0.1"
        name="top_p"
        value={config.top_p}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="Temp"
        type="number"
        step="0.1"
        name="temp"
        value={config.temp}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="Repeat Last N"
        type="number"
        name="repeat_last_n"
        value={config.repeat_last_n}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <TextField
        label="Repeat Penalty"
        type="number"
        step="0.1"
        name="repeat_penalty"
        value={config.repeat_penalty}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            checked={config.debug}
            onChange={handleCheckboxChange}
            name="debug"
            color="primary"
          />
        }
        label="Debug"
        size="small"
        style={configStyle}
      />
      <br />
      <Select
        label="Models"
        name="models"
        value={config.models}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      >
        {config.models.map((model) => (
          <MenuItem key={model} value={model}>{model}</MenuItem>
        ))}
      </Select>
      <TextField
        label="User Name"
        type="text"
        name="userName"
        value={config.userName}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <TextField
        label="Bot Name"
        type="text"
        name="botName"
        value={config.botName}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={configStyle}
      />
      <TextField
        label="Initial Bot Prompt"
        type="text"
        name="initialPrompt"
        value={config.initialPrompt}
        onChange={handleSelectChange}
        margin="normal"
        size="small"
        style={initialPromptStyle}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={config.useFullHistory}
            onChange={handleCheckboxChange}
            name="useFullHistory"
            color="primary"
          />
        }
        label="Use Full History"
        size="small"
        style={configStyle}
      />
    </div>
  );
};

export default ConfigEditor;