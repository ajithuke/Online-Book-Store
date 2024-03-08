import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Firebase from './context/Firebase'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Firebase>
            <App />
        </Firebase>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
