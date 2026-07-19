import { useId, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductContext } from '../hooks/useProductContext'

function ProductDetail() {
  const { id } = useParams()
  const { products, loading, updateProduct } = useProductContext()
  const formId = useId()
  const product = products.find((p) => String(p.id) === id)

  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(product?.price ?? '')
  const [stock, setStock] = useState(product?.stock ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  if (loading) return <p>Loading product...</p>

  if (!product) {
    return (
      <div className="product-detail">
        <p>Product not found.</p>
        <Link to="/shop" className="btn-secondary">
          Back to Shop
        </Link>
      </div>
    )
  }

  function startEditing() {
    setPrice(product.price)
    setStock(product.stock)
    setIsEditing(true)
    setError(null)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await updateProduct(product.id, { price: Number(price), stock: Number(stock) })
      setIsEditing(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="product-detail">
      <Link to="/shop" className="back-link">
        &larr; Back to Shop
      </Link>
      <h1>{product.name}</h1>
      <p className="product-detail-category">
        {product.category} &bull; {product.brand}
      </p>
      <p>{product.description}</p>

      {!isEditing && (
        <div className="product-detail-stats">
          <p>
            <strong>Price:</strong> ${Number(product.price).toFixed(2)}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} units
          </p>
          <button type="button" className="btn-primary" onClick={startEditing}>
            Edit as Admin
          </button>
        </div>
      )}

      {isEditing && (
        <form className="product-form" onSubmit={handleSave}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor={`${formId}-price`}>Price ($)</label>
              <input
                id={`${formId}-price`}
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor={`${formId}-stock`}>Stock</label>
              <input
                id={`${formId}-stock`}
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="hero-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ProductDetail
