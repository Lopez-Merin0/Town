// client/src/main.jsx (CORREGIDO)
import React, { StrictMode } from 'react' // <--- CORRECCIÓN CLAVE
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)