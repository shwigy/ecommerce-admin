import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>404</h1>
        <p className="hero-subtitle">That page doesn&apos;t exist.</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
