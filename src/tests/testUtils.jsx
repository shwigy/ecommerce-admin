import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'

export function mockFetchSequence(responses) {
  let call = 0
  global.fetch = vi.fn(() => {
    const response = responses[Math.min(call, responses.length - 1)]
    call += 1
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(response),
    })
  })
}

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProductProvider>{ui}</ProductProvider>
    </MemoryRouter>,
  )
}
