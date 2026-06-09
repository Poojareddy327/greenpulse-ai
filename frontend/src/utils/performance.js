// Performance Optimization Utilities

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load images with Intersection Observer
 * @param {string} selector - CSS selector for images
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.add('loaded')
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll(selector).forEach(img => imageObserver.observe(img))
  }
}

/**
 * Memoize expensive calculations
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 */
export const memoize = (fn) => {
  const cache = new Map()
  return (...args) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

/**
 * Request Animation Frame wrapper for smooth animations
 * @param {Function} callback - Animation callback
 */
export const rafThrottle = (callback) => {
  let requestId = null
  return (...args) => {
    if (requestId !== null) {
      return
    }
    requestId = requestAnimationFrame(() => {
      callback(...args)
      requestId = null
    })
  }
}

/**
 * Measure component render performance
 * @param {string} componentName - Name of component
 * @param {Function} renderFn - Render function
 */
export const measurePerformance = (componentName, renderFn) => {
  const start = performance.now()
  const result = renderFn()
  const end = performance.now()
  
  if (end - start > 16.67) { // > 60fps threshold
    console.warn(`${componentName} render took ${(end - start).toFixed(2)}ms`)
  }
  
  return result
}

/**
 * Load script dynamically
 * @param {string} src - Script source URL
 * @returns {Promise} Promise that resolves when script loads
 */
export const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

/**
 * Prefetch resources for faster navigation
 * @param {string} url - URL to prefetch
 * @param {string} type - Resource type (fetch, image, style, script)
 */
export const prefetchResource = (url, type = 'fetch') => {
  if ('link' in document.createElement('link')) {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = type
    link.href = url
    document.head.appendChild(link)
  }
}

/**
 * Check if device is low-end
 * @returns {boolean} True if device is low-end
 */
export const isLowEndDevice = () => {
  const memory = navigator.deviceMemory || 4
  const cpuCores = navigator.hardwareConcurrency || 2
  return memory < 4 || cpuCores < 4
}

/**
 * Optimize bundle by code splitting
 * @param {Function} importFn - Dynamic import function
 * @returns {Promise} Component promise
 */
export const lazyLoadComponent = (importFn) => {
  return import(/* webpackChunkName: "lazy" */ importFn)
}

/**
 * Cache API responses
 */
export class APICache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map()
    this.ttl = ttl
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  clear() {
    this.cache.clear()
  }
}

/**
 * Virtual scrolling helper for large lists
 * @param {Array} items - All items
 * @param {number} visibleCount - Number of visible items
 * @param {number} scrollTop - Current scroll position
 * @param {number} itemHeight - Height of each item
 */
export const getVisibleItems = (items, visibleCount, scrollTop, itemHeight) => {
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + visibleCount, items.length)
  return {
    items: items.slice(startIndex, endIndex),
    startIndex,
    offsetY: startIndex * itemHeight
  }
}

export default {
  debounce,
  throttle,
  lazyLoadImages,
  memoize,
  rafThrottle,
  measurePerformance,
  loadScript,
  prefetchResource,
  isLowEndDevice,
  APICache
}
