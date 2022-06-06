import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ComputerContextProvider } from './contexts/ComputerContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextProvider>
    <ComputerContextProvider>
      <App />
    </ComputerContextProvider>
  </ThemeContextProvider>
);