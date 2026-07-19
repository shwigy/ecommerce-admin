import { forwardRef } from 'react'

const SearchBar = forwardRef(function SearchBar({ value, onChange, onClear }, ref) {
  return (
    <div className="search-bar">
      <input
        ref={ref}
        type="search"
        placeholder="Search components..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
      {value && (
        <button type="button" className="search-clear" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  )
})

export default SearchBar
