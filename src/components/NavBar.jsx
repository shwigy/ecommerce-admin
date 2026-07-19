import { NavLink } from 'react-router-dom'

function linkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link'
}

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/shop" className={linkClass}>
          Shop
        </NavLink>
        <NavLink to="/admin" className={linkClass}>
          Admin Portal
        </NavLink>
      </div>
    </header>
  )
}

export default NavBar
