import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/shop/${product.id}`} className="product-card">
      <h3>{product.name}</h3>
      <p className="product-card-desc">{product.description}</p>
      <p className="product-card-meta">{product.brand}</p>
      <p className="product-card-price">${Number(product.price).toFixed(2)}</p>
    </Link>
  )
}

export default ProductCard
