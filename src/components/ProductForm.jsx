import { useId, useState } from 'react'

const CATEGORIES = [
  'Graphics Card',
  'Processor',
  'Memory',
  'Storage',
  'Motherboard',
  'Power Supply',
  'Cooling',
  'Case',
]

const EMPTY_FORM = {
  name: '',
  category: CATEGORIES[0],
  brand: '',
  price: '',
  stock: '',
  description: '',
}

function ProductForm({ onSubmit, submitLabel = 'Save' }) {
  const formId = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.brand.trim() || form.price === '' || form.stock === '') {
      setError('Please fill in name, brand, price, and stock.')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      })
      setForm(EMPTY_FORM)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor={`${formId}-name`}>Component Name</label>
        <input
          id={`${formId}-name`}
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-category`}>Category</label>
        <select
          id={`${formId}-category`}
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-brand`}>Brand</label>
        <input
          id={`${formId}-brand`}
          type="text"
          value={form.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${formId}-price`}>Price ($)</label>
          <input
            id={`${formId}-price`}
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-stock`}>Stock</label>
          <input
            id={`${formId}-stock`}
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-description`}>Description</label>
        <textarea
          id={`${formId}-description`}
          rows={3}
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default ProductForm
