import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

const ConfigEditor = () => {
  const [config, setConfig] = useState({
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
  });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('request',  { method: 'installed' });
    socket.on('result', ({request, response}) => {
      if (request.method !== 'installed') return;
      else {
        setConfig(prevConfig => ({ ...prevConfig, 'models': response.models }));
      }
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
    flexWrap: "wrap"
  };

  const configStyle = {
    width: "25%"
  };

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
    </div>
  );
};

export default ConfigEditor;