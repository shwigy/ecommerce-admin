import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddProduct from '../pages/AddProduct'
import { renderWithProviders } from './testUtils'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('AddProduct page', () => {
  it('submits the form and posts a new product', async () => {
    const created = {
      id: 9,
      name: 'Test SSD',
      category: 'Storage',
      brand: 'TestBrand',
      price: 100,
      stock: 5,
      description: 'A test drive',
    }

    let postBody = null
    global.fetch = vi.fn((url, options) => {
      if (!options) {
        return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve([]) })
      }
      postBody = JSON.parse(options.body)
      return Promise.resolve({ ok: true, status: 201, json: () => Promise.resolve(created) })
    })

    renderWithProviders(<AddProduct />, { route: '/admin' })

    await userEvent.type(screen.getByLabelText('Component Name'), 'Test SSD')
    await userEvent.type(screen.getByLabelText('Brand'), 'TestBrand')
    await userEvent.type(screen.getByLabelText('Price ($)'), '100')
    await userEvent.type(screen.getByLabelText('Stock'), '5')
    await userEvent.click(screen.getByRole('button', { name: /add component/i }))

    await waitFor(() => {
      expect(screen.getByText(/Component added/i)).toBeInTheDocument()
    })

    expect(postBody).toMatchObject({ name: 'Test SSD', brand: 'TestBrand', price: 100, stock: 5 })
  })

  it('shows a validation error when required fields are missing', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve([]) }),
    )

    renderWithProviders(<AddProduct />, { route: '/admin' })

    await userEvent.click(screen.getByRole('button', { name: /add component/i }))

    expect(await screen.findByText(/please fill in/i)).toBeInTheDocument()
  })
})
