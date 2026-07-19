import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Shop from '../pages/Shop'
import { mockFetchSequence, renderWithProviders } from './testUtils'

const products = [
  { id: 1, name: 'Vortex X1 GPU', category: 'Graphics Card', brand: 'Vortex', price: 799.99, stock: 12, description: 'GPU' },
  { id: 2, name: 'Core Prime 9700', category: 'Processor', brand: 'Coretek', price: 429.5, stock: 25, description: 'CPU' },
]

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Shop page', () => {
  it('renders all products after loading', async () => {
    mockFetchSequence([products])
    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('Vortex X1 GPU')).toBeInTheDocument()
    })
    expect(screen.getByText('Core Prime 9700')).toBeInTheDocument()
  })

  it('filters products by search term', async () => {
    mockFetchSequence([products])
    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('Vortex X1 GPU')).toBeInTheDocument()
    })

    const searchInput = screen.getByLabelText('Search products')
    await userEvent.type(searchInput, 'core')

    expect(screen.queryByText('Vortex X1 GPU')).not.toBeInTheDocument()
    expect(screen.getByText('Core Prime 9700')).toBeInTheDocument()
  })
})
