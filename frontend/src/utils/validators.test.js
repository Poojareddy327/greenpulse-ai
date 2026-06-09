import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  validateRange,
  sanitizeInput,
  validateCarbonInput,
  validateURL,
  validatePhone,
  validatePastDate,
  validateRequiredFields,
} from './validators'

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should accept strong password', () => {
      const result = validatePassword('Test123!@#')
      expect(result.isValid).toBe(true)
    })

    it('should reject short password', () => {
      const result = validatePassword('Test1!')
      expect(result.isValid).toBe(false)
      expect(result.message).toContain('8 characters')
    })

    it('should reject password without uppercase', () => {
      const result = validatePassword('test123!@#')
      expect(result.isValid).toBe(false)
    })

    it('should reject password without lowercase', () => {
      const result = validatePassword('TEST123!@#')
      expect(result.isValid).toBe(false)
    })

    it('should reject password without number', () => {
      const result = validatePassword('TestTest!@#')
      expect(result.isValid).toBe(false)
    })

    it('should reject password without special char', () => {
      const result = validatePassword('Test1234')
      expect(result.isValid).toBe(false)
    })
  })

  describe('validateRange', () => {
    it('should validate number in range', () => {
      expect(validateRange(50, 0, 100)).toBe(true)
      expect(validateRange(0, 0, 100)).toBe(true)
      expect(validateRange(100, 0, 100)).toBe(true)
    })

    it('should reject number out of range', () => {
      expect(validateRange(-1, 0, 100)).toBe(false)
      expect(validateRange(101, 0, 100)).toBe(false)
    })

    it('should handle string numbers', () => {
      expect(validateRange('50', 0, 100)).toBe(true)
    })
  })

  describe('sanitizeInput', () => {
    it('should escape HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).not.toContain('<script>')
      expect(sanitizeInput('Test & Value')).toContain('&amp;')
    })

    it('should handle non-string input', () => {
      expect(sanitizeInput(null)).toBe('')
      expect(sanitizeInput(undefined)).toBe('')
      expect(sanitizeInput(123)).toBe('')
    })

    it('should trim whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test')
    })
  })

  describe('validateCarbonInput', () => {
    it('should validate correct carbon data', () => {
      const data = {
        transportation: { car_km: 100, public_transport_km: 50, flights: 2 },
        energy: { electricity_kwh: 300, natural_gas_kwh: 150 },
        food: { meat_servings: 10, dairy_servings: 14 }
      }
      const result = validateCarbonInput(data)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject out of range values', () => {
      const data = {
        transportation: { car_km: 20000 }
      }
      const result = validateCarbonInput(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('validateURL', () => {
    it('should validate correct URL', () => {
      expect(validateURL('https://example.com')).toBe(true)
      expect(validateURL('http://test.com/path')).toBe(true)
    })

    it('should reject invalid URL', () => {
      expect(validateURL('not a url')).toBe(false)
      expect(validateURL('htp://wrong')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate correct phone', () => {
      expect(validatePhone('+1234567890')).toBe(true)
      expect(validatePhone('(123) 456-7890')).toBe(true)
    })

    it('should reject invalid phone', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abcdefghij')).toBe(false)
    })
  })

  describe('validatePastDate', () => {
    it('should validate past date', () => {
      const pastDate = new Date('2020-01-01')
      expect(validatePastDate(pastDate)).toBe(true)
    })

    it('should reject future date', () => {
      const futureDate = new Date('2030-01-01')
      expect(validatePastDate(futureDate)).toBe(false)
    })
  })

  describe('validateRequiredFields', () => {
    it('should validate all fields present', () => {
      const data = { name: 'Test', email: 'test@example.com', age: 25 }
      const result = validateRequiredFields(data, ['name', 'email', 'age'])
      expect(result.isValid).toBe(true)
      expect(result.missing).toHaveLength(0)
    })

    it('should detect missing fields', () => {
      const data = { name: 'Test' }
      const result = validateRequiredFields(data, ['name', 'email', 'age'])
      expect(result.isValid).toBe(false)
      expect(result.missing).toContain('email')
      expect(result.missing).toContain('age')
    })
  })
})
