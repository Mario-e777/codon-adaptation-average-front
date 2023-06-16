import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChartsProvider from './components/contexts/charts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChartsProvider>
      <App />
    </ChartsProvider>
  </React.StrictMode>
);
