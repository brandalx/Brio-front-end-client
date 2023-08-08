import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';

const container = document.getElementById('app');
const root = createRoot(container);
const production = import.meta.env.VITE_REACT_APP_ENV_NAME;
if (production === 'production') {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
  console.info = function () {};
  console.debug = function () {};
}
root.render(<App />);
