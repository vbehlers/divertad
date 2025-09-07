import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Mount only if the host page has the target element
const mount = document.getElementById('home-island');
if (mount) {
  const root = createRoot(mount);
  root.render(<App />);
}

