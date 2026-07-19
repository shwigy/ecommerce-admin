import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useProducts } from '../hooks/useProducts'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useProducts', () => {
  it('loads products on mount', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{ id: 1, name: 'Test Part' }]),
      }),
    )

    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.products).toEqual([{ id: 1, name: 'Test Part' }])
  })

  it('updates a product via PATCH and reflects the change locally', async () => {
    globalThis.fetch = vi.fn((url, options) => {
      if (options?.method === 'PATCH') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ id: 1, name: 'Test Part', price: 50 }),
        })
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{ id: 1, name: 'Test Part', price: 30 }]),
      })
    })

    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.updateProduct(1, { price: 50 })
    })

    expect(result.current.products[0].price).toBe(50)
  })
})
