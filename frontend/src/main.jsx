import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize performance monitoring and analytics (with error handling)
try {
  import('./utils/analytics')
    .then(({ initAnalytics }) => {
      initAnalytics()
    })
    .catch(error => {
      console.warn('Analytics initialization skipped:', error.message)
    })
} catch (error) {
  console.warn('Analytics module not found')
}

// Register service worker for PWA support (only in production)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          registration.update()
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Instant refresh to load new build chunks without showing stale UI
                  window.location.reload()
                }
              })
            }
          })
        })
        .catch(() => {
          // Service worker optional
        })
    })
  } else {
    // In dev: unregister existing service workers to avoid stale cache
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(r => r.unregister())
    })
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
