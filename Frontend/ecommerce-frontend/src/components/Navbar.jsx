import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
function Navbar() {
  return (
    <nav>
        <h2 className='italic'>Store</h2>
      <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/cart">Cart</Link></li>
      <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
