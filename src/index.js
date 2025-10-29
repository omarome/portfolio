import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function initializeTheme() {
  try {
    const stored = localStorage.getItem('theme');
    const osPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (osPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      // Use background color from CSS variables when available
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim() || (theme === 'dark' ? '#000000' : '#ffffff');
      meta.setAttribute('content', bg);
    }

    // Keep in sync with OS changes if user hasn't explicitly chosen
    if (!stored && window.matchMedia) {
      const listener = (e) => {
        const next = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        const meta2 = document.querySelector('meta[name="theme-color"]');
        if (meta2) {
          const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim() || (next === 'dark' ? '#000000' : '#ffffff');
          meta2.setAttribute('content', bg2);
        }
      };
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener ? mq.addEventListener('change', listener) : mq.addListener(listener);
    }
  } catch (_) {
    // no-op
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {initializeTheme()}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
