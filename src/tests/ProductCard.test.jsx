import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const product = {
  id: 1,
  name: 'Vortex X1 GPU',
  category: 'Graphics Card',
  brand: 'Vortex',
  price: 799.99,
  stock: 12,
  description: 'A great graphics card.',
}

describe('ProductCard', () => {
  it('renders product name, brand, and formatted price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Vortex X1 GPU')).toBeInTheDocument()
    expect(screen.getByText('Vortex')).toBeInTheDocument()
    expect(screen.getByText('$799.99')).toBeInTheDocument()
  })

  it('links to the product detail route', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/shop/1')
  })
})
