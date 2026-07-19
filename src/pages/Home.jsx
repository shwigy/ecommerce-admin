import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>BranTech Depot</h1>
        <p className="hero-subtitle">
          The admin portal for managing our retail computer component catalog.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="btn-primary">
            Browse Shop
          </Link>
          <Link to="/admin" className="btn-secondary">
            Admin Portal
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
