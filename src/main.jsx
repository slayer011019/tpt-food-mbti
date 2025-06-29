// main.jsx 예시 (정상 작동하려면 이렇게 되어야 함)
import React,{ StrictMode } from 'react';
import ReactDOM,{ BrowserRouter } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
