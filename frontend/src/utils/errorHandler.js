/**
 * Centralized Error Handling Utility
 * Provides consistent error handling across the application
 */

/**
 * Error types for classification
 */
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTH: 'AUTHENTICATION_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
}

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  constructor(message, type = ErrorTypes.UNKNOWN, statusCode = 500, details = {}) {
    super(message)
    this.name = 'AppError'
    this.type = type
    this.statusCode = statusCode
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

/**
 * Parse API error response
 * @param {Error} error - Error object from API call
 * @returns {AppError} Parsed error object
 */
export const parseAPIError = (error) => {
  // Network error
  if (!error.response) {
    return new AppError(
      'Network error. Please check your connection.',
      ErrorTypes.NETWORK,
      0,
      { originalError: error.message }
    )
  }

  const { status, data } = error.response

  // Parse based on status code
  switch (status) {
    case 400:
      return new AppError(
        data.detail || 'Invalid request',
        ErrorTypes.VALIDATION,
        400,
        data
      )
    
    case 401:
      return new AppError(
        'Please log in to continue',
        ErrorTypes.AUTH,
        401
      )
    
    case 403:
      return new AppError(
        'You do not have permission to perform this action',
        ErrorTypes.PERMISSION,
        403
      )
    
    case 404:
      return new AppError(
        'Resource not found',
        ErrorTypes.NOT_FOUND,
        404
      )
    
    case 429:
      return new AppError(
        'Too many requests. Please try again later.',
        ErrorTypes.NETWORK,
        429
      )
    
    case 500:
    case 502:
    case 503:
      return new AppError(
        'Server error. Please try again later.',
        ErrorTypes.SERVER,
        status
      )
    
    default:
      return new AppError(
        data.detail || 'An unexpected error occurred',
        ErrorTypes.UNKNOWN,
        status,
        data
      )
  }
}

/**
 * Log error to console (or external service in production)
 * @param {Error|AppError} error - Error to log
 * @param {Object} context - Additional context
 */
export const logError = (error, context = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    type: error.type || ErrorTypes.UNKNOWN,
    statusCode: error.statusCode || 500,
    stack: error.stack,
    context,
    userAgent: navigator.userAgent,
    url: window.location.href,
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Log:', errorLog)
  }

  // In production, send to error tracking service
  // Example: Sentry, LogRocket, etc.
  // sendToErrorTrackingService(errorLog)
}

/**
 * Get user-friendly error message
 * @param {Error|AppError} error - Error object
 * @returns {string} User-friendly message
 */
export const getUserMessage = (error) => {
  if (error instanceof AppError) {
    return error.message
  }

  // Default messages for common errors
  const defaultMessages = {
    [ErrorTypes.NETWORK]: 'Unable to connect. Please check your internet connection.',
    [ErrorTypes.AUTH]: 'Your session has expired. Please log in again.',
    [ErrorTypes.PERMISSION]: 'You do not have permission to access this resource.',
    [ErrorTypes.NOT_FOUND]: 'The requested resource was not found.',
    [ErrorTypes.SERVER]: 'Something went wrong on our end. Please try again later.',
  }

  return defaultMessages[error.type] || 'An unexpected error occurred. Please try again.'
}

/**
 * Handle async errors with try-catch wrapper
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped function
 */
export const asyncHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      const appError = parseAPIError(error)
      logError(appError, { function: fn.name, args })
      throw appError
    }
  }
}

/**
 * Retry failed requests with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delayMs - Initial delay in milliseconds
 * @returns {Promise} Result of function
 */
export const retryWithBackoff = async (fn, maxRetries = 3, delayMs = 1000) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      // Don't retry on client errors
      if (error.statusCode && error.statusCode < 500) {
        throw error
      }

      // Last attempt
      if (attempt === maxRetries - 1) {
        throw error
      }

      // Exponential backoff
      const delay = delayMs * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

/**
 * Error boundary helper for React components
 * @param {Error} error - Error caught by error boundary
 * @param {Object} errorInfo - Error info from React
 * @returns {Object} Error details
 */
export const handleReactError = (error, errorInfo) => {
  const errorDetails = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
  }

  logError(error, errorDetails)

  return errorDetails
}

/**
 * Validate and handle form errors
 * @param {Object} errors - Validation errors
 * @returns {string} Combined error message
 */
export const formatValidationErrors = (errors) => {
  if (Array.isArray(errors)) {
    return errors.join('. ')
  }

  if (typeof errors === 'object') {
    return Object.entries(errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join('. ')
  }

  return String(errors)
}

/**
 * Check if error is recoverable
 * @param {Error|AppError} error - Error to check
 * @returns {boolean} True if recoverable
 */
export const isRecoverable = (error) => {
  const recoverableTypes = [
    ErrorTypes.NETWORK,
    ErrorTypes.VALIDATION,
  ]

  return error instanceof AppError && recoverableTypes.includes(error.type)
}

/**
 * Create error notification object
 * @param {Error|AppError} error - Error object
 * @returns {Object} Notification object
 */
export const createErrorNotification = (error) => {
  return {
    type: 'error',
    title: 'Error',
    message: getUserMessage(error),
    duration: 5000,
    action: isRecoverable(error) ? { label: 'Retry', callback: () => {} } : null,
  }
}

export default {
  ErrorTypes,
  AppError,
  parseAPIError,
  logError,
  getUserMessage,
  asyncHandler,
  retryWithBackoff,
  handleReactError,
  formatValidationErrors,
  isRecoverable,
  createErrorNotification,
}
