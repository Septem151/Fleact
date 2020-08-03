import React from 'react';
import './App.css';
import Content from './components/Content';

function App() {
  return (
    <div className="container">
      <div className="header-container">
        <h1 className="app-title">
          Fleact
        </h1>
        <p className="app-subtitle">
          React Frontend, Flask Backend
        </p>
      </div>
      <Content />
      <div className="footer-container">
        <small className="app-footer">© Copyright 2020 | Carson Mullins</small>
        <a className="github-link" href="https://github.com/Septem151/Fleact"> </a>
      </div>
    </div >
  );
}

export default App;
