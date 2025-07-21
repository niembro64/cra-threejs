import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <- now we use Tailwind & global CSS here
import App from './App';
import reportWebVitals from './reportWebVitals';

import ReactGA from 'react-ga4';

// Replace with your GA4 Measurement ID
ReactGA.initialize('G-ZJKVQHDXR8');

// Optionally send a pageview for the initial load
ReactGA.send('pageview');

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
