import { useContext } from 'react'
import { ProductContext } from '../context/productContextInstance'

export function useProductContext() {
  const ctx = useContext(ProductContext)
  if (!ctx) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return ctx
}
