/**
 * Input Validation Utilities
 * Ensures data integrity and security
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {{isValid: boolean, message: string}} Validation result
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' }
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain uppercase letter' }
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain lowercase letter' }
  }

  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain a number' }
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: 'Password must contain special character' }
  }

  return { isValid: true, message: 'Strong password' }
}

/**
 * Validate number is within range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} True if within range
 */
export const validateRange = (value, min, max) => {
  const num = Number(value)
  return !isNaN(num) && num >= min && num <= max
}

/**
 * Sanitize string input to prevent XSS
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return ''
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Validate carbon calculation input
 * @param {Object} data - Carbon data to validate
 * @returns {{isValid: boolean, errors: string[]}} Validation result
 */
export const validateCarbonInput = (data) => {
  const errors = []

  // Validate transportation
  if (data.transportation) {
    const { car_km, public_transport_km, flights } = data.transportation
    
    if (car_km !== undefined && !validateRange(car_km, 0, 10000)) {
      errors.push('Car km must be between 0 and 10000')
    }
    
    if (public_transport_km !== undefined && !validateRange(public_transport_km, 0, 10000)) {
      errors.push('Public transport km must be between 0 and 10000')
    }
    
    if (flights !== undefined && !validateRange(flights, 0, 100)) {
      errors.push('Flights must be between 0 and 100')
    }
  }

  // Validate energy
  if (data.energy) {
    const { electricity_kwh, natural_gas_kwh } = data.energy
    
    if (electricity_kwh !== undefined && !validateRange(electricity_kwh, 0, 10000)) {
      errors.push('Electricity must be between 0 and 10000 kWh')
    }
    
    if (natural_gas_kwh !== undefined && !validateRange(natural_gas_kwh, 0, 10000)) {
      errors.push('Natural gas must be between 0 and 10000 kWh')
    }
  }

  // Validate food
  if (data.food) {
    const { meat_servings, dairy_servings } = data.food
    
    if (meat_servings !== undefined && !validateRange(meat_servings, 0, 100)) {
      errors.push('Meat servings must be between 0 and 100')
    }
    
    if (dairy_servings !== undefined && !validateRange(dairy_servings, 0, 100)) {
      errors.push('Dairy servings must be between 0 and 100')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid format
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

/**
 * Validate date is not in future
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if valid date
 */
export const validatePastDate = (date) => {
  const dateObj = new Date(date)
  const now = new Date()
  return dateObj <= now && !isNaN(dateObj.getTime())
}

/**
 * Validate required fields in object
 * @param {Object} data - Data object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {{isValid: boolean, missing: string[]}} Validation result
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missing = requiredFields.filter(field => {
    const value = data[field]
    return value === undefined || value === null || value === ''
  })

  return {
    isValid: missing.length === 0,
    missing
  }
}

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} True if within size limit
 */
export const validateFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file && file.size <= maxSizeBytes
}

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @returns {boolean} True if allowed type
 */
export const validateFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
  return file && allowedTypes.includes(file.type)
}

export default {
  validateEmail,
  validatePassword,
  validateRange,
  sanitizeInput,
  validateCarbonInput,
  validateURL,
  validatePhone,
  validatePastDate,
  validateRequiredFields,
  validateFileSize,
  validateFileType
}
