import { describe, it, expect, vi } from 'vitest'
import { exportToCSV, exportToJSON, exportToPDF, shareData } from './exportData'

describe('Export Data Utility', () => {
  const mockData = {
    carbonFootprint: 250,
    date: '2024-06-09',
    categories: {
      transport: 100,
      energy: 80,
      food: 70
    }
  }

  it('exports data to CSV format', () => {
    const csv = exportToCSV(mockData)
    expect(csv).toContain('carbonFootprint')
    expect(csv).toContain('250')
    expect(typeof csv).toBe('string')
  })

  it('exports data to JSON format', () => {
    const json = exportToJSON(mockData)
    expect(json).toContain('"carbonFootprint":250')
    expect(typeof json).toBe('string')
    const parsed = JSON.parse(json)
    expect(parsed.carbonFootprint).toBe(250)
  })

  it('generates PDF export structure', () => {
    const pdf = exportToPDF(mockData)
    expect(pdf).toBeDefined()
    expect(pdf.title).toBeDefined()
    expect(pdf.data).toBeDefined()
  })

  it('handles empty data gracefully', () => {
    const csv = exportToCSV({})
    expect(typeof csv).toBe('string')
  })

  it('handles array data in CSV export', () => {
    const arrayData = [
      { name: 'Test 1', value: 10 },
      { name: 'Test 2', value: 20 }
    ]
    const csv = exportToCSV(arrayData)
    expect(csv).toContain('Test 1')
    expect(csv).toContain('Test 2')
  })

  it('validates JSON output', () => {
    const json = exportToJSON(mockData)
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('includes metadata in exports', () => {
    const json = exportToJSON(mockData)
    const parsed = JSON.parse(json)
    expect(parsed.exportDate).toBeDefined()
  })
})
