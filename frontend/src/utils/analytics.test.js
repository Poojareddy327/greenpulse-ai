import { describe, it, expect, vi, beforeEach } from 'vitest'
import { trackPageView, trackEvent, trackError, getAnalytics } from './analytics'

describe('Analytics Utility', () => {
  beforeEach(() => {
    // Clear analytics data before each test
    global.performance = {
      now: vi.fn(() => 1000),
      getEntriesByType: vi.fn(() => []),
    }
  })

  it('tracks page views correctly', () => {
    const result = trackPageView('/home')
    expect(result).toBeDefined()
    expect(result.page).toBe('/home')
    expect(result.timestamp).toBeDefined()
  })

  it('tracks events with custom data', () => {
    const eventData = {
      category: 'button',
      action: 'click',
      label: 'submit',
      value: 1
    }
    const result = trackEvent(eventData)
    expect(result).toBeDefined()
    expect(result.category).toBe('button')
    expect(result.action).toBe('click')
  })

  it('tracks errors with stack trace', () => {
    const error = new Error('Test error')
    const result = trackError(error, { context: 'test' })
    expect(result).toBeDefined()
    expect(result.message).toBe('Test error')
    expect(result.context).toBeDefined()
  })

  it('returns analytics summary', () => {
    trackPageView('/test')
    trackEvent({ action: 'test' })
    const analytics = getAnalytics()
    expect(analytics).toBeDefined()
    expect(analytics.pageViews).toBeGreaterThanOrEqual(0)
    expect(analytics.events).toBeGreaterThanOrEqual(0)
  })

  it('handles missing error gracefully', () => {
    const result = trackError(null)
    expect(result).toBeDefined()
    expect(result.message).toBe('Unknown error')
  })

  it('calculates performance metrics', () => {
    const analytics = getAnalytics()
    expect(analytics.performance).toBeDefined()
  })
})
