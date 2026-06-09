import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Calculator from './Calculator'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Calculator Component', () => {
  it('renders calculator title', () => {
    renderWithRouter(<Calculator />)
    expect(screen.getByText(/Carbon Footprint/i)).toBeInTheDocument()
  })

  it('renders all input categories', () => {
    renderWithRouter(<Calculator />)
    expect(screen.getByText(/Transportation/i)).toBeInTheDocument()
    expect(screen.getByText(/Energy/i)).toBeInTheDocument()
  })

  it('allows user to input data', () => {
    renderWithRouter(<Calculator />)
    const inputs = screen.getAllByRole('spinbutton')
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: '100' } })
      expect(inputs[0].value).toBe('100')
    }
  })

  it('calculates carbon footprint on button click', async () => {
    renderWithRouter(<Calculator />)
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    fireEvent.click(calculateButton)
    // Wait for calculation to complete
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })
  })

  it('displays results after calculation', async () => {
    renderWithRouter(<Calculator />)
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    fireEvent.click(calculateButton)
    await waitFor(() => {
      const resultsElements = screen.queryAllByText(/kg/i)
      expect(resultsElements.length).toBeGreaterThan(0)
    })
  })
})
