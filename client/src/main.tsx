import React from 'react'
import ReactDOM from 'react-dom/client'
import SensorsPanel from './SensorsPanel.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SensorsPanel />
  </React.StrictMode>,
)
