import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './components/TaskContext/TaskContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskProvider>
  </StrictMode>,
)
