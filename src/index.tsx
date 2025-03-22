import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ModalProvider } from './contexts/ModalContext';
import { VisitsProvider } from './contexts/VisitContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <VisitsProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </VisitsProvider>
  </React.StrictMode>
);

reportWebVitals();
