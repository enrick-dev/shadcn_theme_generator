import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/theme';
import HandleThemmingProvider from './context/HandleThemming.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HandleThemmingProvider>
        <App />
      </HandleThemmingProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
