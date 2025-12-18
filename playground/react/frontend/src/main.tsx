// > BOOT SEQUENCE
// > Browser loads html
// > finds #root from App

// react's "referee"
import { StrictMode } from 'react'
// react's interface to talk to browser. createRoot: entry point
import { createRoot } from 'react-dom/client'
// import style sheet
import './index.css'
// import component
import App from './App.tsx'

// document.getElementById('root') - grabs real DOM node from index.html
// ..)! - emphasizing on existence
// createRoot() - bind React to DOM node
// .render() - start app
createRoot(document.getElementById('root')!).render(
  // run App in strict mode
  <StrictMode>
    <App />
  </StrictMode>,
)
