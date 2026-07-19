# BranTech Depot Admin Portal

A React SPA for managing a retail computer components catalog. Built with Vite, React Router, and a simulated backend (`json-server`).

## Features

- **Home** (`/`) — landing page.
- **Shop** (`/shop`) — searchable, filterable product grid.
- **Product Detail** (`/shop/:id`) — view a product, edit price/stock as admin (PATCH).
- **Admin Portal** (`/admin`) — form to add a new component (POST).

## Concepts Used

`react-router-dom` routing/navigation, `useState`, `useContext` (`ProductContext`), `useRef` (search focus), `useId` (form labels), a custom `useProducts` hook wrapping GET/POST/PATCH, and Vitest + React Testing Library tests.

## Getting Started

```bash
npm install
npm run dev:all   # starts json-server (:3001) and Vite (:5173) together
```

Or separately: `npm run server` and `npm run dev`.

## Testing

```bash
npm test
```

## Data

Sample data lives in `db.json` at the project root, served by `json-server`. Edits made via the Admin Portal persist for the life of the `json-server` process.
