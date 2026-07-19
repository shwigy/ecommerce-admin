import { useProducts } from '../hooks/useProducts'
import { ProductContext } from './productContextInstance'

export function ProductProvider({ children }) {
  const value = useProducts()
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
