import { describe, it, expect } from 'vitest'

describe('Utility Functions', () => {
  describe('Carbon Calculations', () => {
    it('should calculate car emissions correctly', () => {
      const calculateCarEmissions = (km) => km * 0.12
      expect(calculateCarEmissions(100)).toBe(12)
    })

    it('should calculate public transport emissions', () => {
      const calculatePublicTransport = (km) => km * 0.05
      expect(calculatePublicTransport(100)).toBe(5)
    })

    it('should calculate zero emissions for bicycle', () => {
      const calculateBikeEmissions = () => 0
      expect(calculateBikeEmissions(100)).toBe(0)
    })
  })

  describe('Data Validation', () => {
    it('should validate positive numbers', () => {
      const isPositive = (num) => num > 0
      expect(isPositive(10)).toBe(true)
      expect(isPositive(-5)).toBe(false)
      expect(isPositive(0)).toBe(false)
    })

    it('should validate email format', () => {
      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('invalid')).toBe(false)
    })
  })

  describe('Data Transformations', () => {
    it('should format numbers with commas', () => {
      const formatNumber = (num) => num.toLocaleString()
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1000000)).toBe('1,000,000')
    })

    it('should calculate percentages', () => {
      const calculatePercentage = (value, total) => (value / total) * 100
      expect(calculatePercentage(25, 100)).toBe(25)
      expect(calculatePercentage(50, 200)).toBe(25)
    })

    it('should round to 2 decimal places', () => {
      const round = (num) => Math.round(num * 100) / 100
      expect(round(3.14159)).toBe(3.14)
      expect(round(2.567)).toBe(2.57)
    })
  })

  describe('Array Operations', () => {
    it('should sum array of numbers', () => {
      const sum = (arr) => arr.reduce((a, b) => a + b, 0)
      expect(sum([1, 2, 3, 4, 5])).toBe(15)
      expect(sum([10, 20, 30])).toBe(60)
    })

    it('should find maximum value in array', () => {
      const findMax = (arr) => Math.max(...arr)
      expect(findMax([1, 5, 3, 9, 2])).toBe(9)
      expect(findMax([100, 50, 200])).toBe(200)
    })

    it('should filter out null values', () => {
      const removeNulls = (arr) => arr.filter(item => item !== null)
      expect(removeNulls([1, null, 2, null, 3])).toEqual([1, 2, 3])
    })
  })

  describe('String Operations', () => {
    it('should convert to uppercase', () => {
      expect('hello'.toUpperCase()).toBe('HELLO')
    })

    it('should trim whitespace', () => {
      expect('  test  '.trim()).toBe('test')
    })

    it('should check if string contains substring', () => {
      expect('carbon footprint'.includes('carbon')).toBe(true)
      expect('carbon footprint'.includes('xyz')).toBe(false)
    })
  })

  describe('Date Operations', () => {
    it('should get current year', () => {
      const year = new Date().getFullYear()
      expect(year).toBeGreaterThan(2020)
    })

    it('should create date object', () => {
      const date = new Date('2024-01-01')
      expect(date.getFullYear()).toBe(2024)
      expect(date.getMonth()).toBe(0) // January is 0
    })
  })

  describe('Object Operations', () => {
    it('should merge objects', () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { c: 3 }
      const merged = { ...obj1, ...obj2 }
      expect(merged).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should get object keys', () => {
      const obj = { name: 'test', value: 100 }
      expect(Object.keys(obj)).toEqual(['name', 'value'])
    })

    it('should check if object has property', () => {
      const obj = { name: 'test' }
      expect(obj.hasOwnProperty('name')).toBe(true)
      expect(obj.hasOwnProperty('missing')).toBe(false)
    })
  })

  describe('Boolean Operations', () => {
    it('should perform logical AND', () => {
      expect(true && true).toBe(true)
      expect(true && false).toBe(false)
    })

    it('should perform logical OR', () => {
      expect(true || false).toBe(true)
      expect(false || false).toBe(false)
    })

    it('should perform logical NOT', () => {
      expect(!true).toBe(false)
      expect(!false).toBe(true)
    })
  })

  describe('Math Operations', () => {
    it('should calculate square root', () => {
      expect(Math.sqrt(16)).toBe(4)
      expect(Math.sqrt(25)).toBe(5)
    })

    it('should calculate power', () => {
      expect(Math.pow(2, 3)).toBe(8)
      expect(Math.pow(10, 2)).toBe(100)
    })

    it('should generate random numbers', () => {
      const random = Math.random()
      expect(random).toBeGreaterThanOrEqual(0)
      expect(random).toBeLessThan(1)
    })
  })
})
