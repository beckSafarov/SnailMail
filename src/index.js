import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App';
import {AuthProvider} from './context/AuthContext'
import { MailsProvider } from './context/MailsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MailsProvider>
        <App />
      </MailsProvider>
    </AuthProvider>
  </React.StrictMode>
);

