import React from 'react';
import ReactDOM from 'react-dom';

import ChatInterface from './ChatInterface'
import ConfigEditor from './ConfigEditor'

function App() {
  return (
    <div>
      <ConfigEditor />
      <ChatInterface />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));