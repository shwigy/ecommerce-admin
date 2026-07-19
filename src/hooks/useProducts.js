import { useCallback, useEffect, useState } from 'react'
import { getProducts, createProduct, patchProduct } from '../api/client'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Fetching on mount to sync with the mock backend is the intended use of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts()
  }, [fetchProducts])

  const addProduct = useCallback(async (product) => {
    const created = await createProduct(product)
    setProducts((prev) => [...prev, created])
    return created
  }, [])

  const updateProduct = useCallback(async (id, updates) => {
    const updated = await patchProduct(id, updates)
    setProducts((prev) => prev.map((p) => (String(p.id) === String(id) ? updated : p)))
    return updated
  }, [])

  return { products, loading, error, refetch: fetchProducts, addProduct, updateProduct }
}
