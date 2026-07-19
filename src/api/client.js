export const API_URL = 'http://localhost:3001/products'

async function parseOrThrow(res, fallbackMessage) {
  if (!res.ok) {
    throw new Error(`${fallbackMessage} (${res.status})`)
  }
  return res.json()
}

export function getProducts() {
  return fetch(API_URL).then((res) => parseOrThrow(res, 'Failed to load products'))
}

export function createProduct(product) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  }).then((res) => parseOrThrow(res, 'Failed to add product'))
}

export function patchProduct(id, updates) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  }).then((res) => parseOrThrow(res, 'Failed to update product'))
}
