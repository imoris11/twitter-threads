import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form } from './components/Form';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        <a
          className="App-link"
          href="https://github.com/imoris11"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;
