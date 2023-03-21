import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Divider } from '@mui/material';

import ChatInterface from './ChatInterface'
import ConfigEditor from './ConfigEditor'
import Footer from './Footer'
import Header from './Header'

const App = () => {
  
  const [chatConfig, setChatConfig] = useState({
    seed: -1,
    threads: 4,
    n_predict: 200,
    top_k: 40,
    top_p: 0.9,
    temp: 0.1,
    repeat_last_n: 64,
    repeat_penalty: 1.3,
    debug: false,
    models: [],
    initialPrompt: `Hi there! I'm your virtual assistant, ChadGPT. I provide informative and helpful responses. What can I do for you?`,
    userName: '@User',
    botName: '@ChadGPT',
    useFullHistory: true
  });

  return (
    <div>
      <Header />
      <ConfigEditor config={chatConfig} setConfig={setChatConfig} />
      <br />
      <Divider />
      <br />
      <ChatInterface config={chatConfig} />
      <br />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));