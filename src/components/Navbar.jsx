import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          User Management System
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/create" className="navbar-link navbar-link-create">
            + Create User
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar