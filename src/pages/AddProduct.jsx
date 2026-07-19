import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../hooks/useProductContext'
import ProductForm from '../components/ProductForm'

function AddProduct() {
  const { addProduct } = useProductContext()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  async function handleSubmit(product) {
    const created = await addProduct(product)
    setSuccess(true)
    setTimeout(() => navigate(`/shop/${created.id}`), 800)
  }

  return (
    <section className="admin-page">
      <h1>Add a New Component</h1>
      <p className="hero-subtitle">Enter the details below to add a product to the catalog.</p>
      {success && <p className="form-success">Component added! Redirecting...</p>}
      <ProductForm onSubmit={handleSubmit} submitLabel="Add Component" />
    </section>
  )
}

export default AddProduct
