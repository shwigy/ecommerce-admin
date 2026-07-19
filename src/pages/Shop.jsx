import { useMemo, useRef, useState } from 'react'
import { useProductContext } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'

function Shop() {
  const { products, loading, error } = useProductContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const searchInputRef = useRef(null)

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return products.filter((product) => {
      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(product.category)
      return matchesTerm && matchesCategory
    })
  }, [products, searchTerm, activeCategories])

  function toggleCategory(category) {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  function clearSearch() {
    setSearchTerm('')
    searchInputRef.current?.focus()
  }

  return (
    <section className="shop-page">
      <aside className="shop-sidebar">
        <SearchBar
          ref={searchInputRef}
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={clearSearch}
        />
        <h4>Category</h4>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="checkbox"
                  checked={activeCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      <div className="shop-results">
        {loading && <p>Loading products...</p>}
        {error && (
          <p className="form-error">
            {error}. Make sure the mock server is running (npm run server).
          </p>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <p>No components match your search.</p>
        )}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Shop
