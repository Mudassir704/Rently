import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css'

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ "background": "lightgrey" }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="#">
            Rently
          </Link>
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            {user && user.isAdmin &&
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>}
            {user &&
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>}
          </div>
        </div>
        <div className="d-flex align-items-center">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar