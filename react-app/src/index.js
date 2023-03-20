import React from 'react';
import ReactDOM from 'react-dom';

import ChatInterface from './ChatInterface'
import ConfigEditor from './ConfigEditor'
import Footer from './Footer'
import Header from './Header'

function App() {
  return (
    <div>
      <Header />
      <ConfigEditor />
      <ChatInterface />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));