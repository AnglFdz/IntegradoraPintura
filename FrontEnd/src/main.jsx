import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primeicons/primeicons.css'; 
import '/node_modules/primeflex/primeflex.css'; 
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)