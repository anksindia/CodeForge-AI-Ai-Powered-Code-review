import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './components/AppLayout';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppLayout>
      <App />
    </AppLayout>
  </StrictMode>
);
