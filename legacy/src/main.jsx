import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './context/theme';
import HandleThemmingProvider from './context/HandleThemming.jsx';
import Home from './pages/Home/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HandleThemmingProvider>
        <Home />
      </HandleThemmingProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
