import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
  { threshold: 0.1 }
)
document.querySelectorAll('section').forEach(s => observer.observe(s))

// Re-run after React renders
setTimeout(() => {
  document.querySelectorAll('section').forEach(s => observer.observe(s))
}, 500)
