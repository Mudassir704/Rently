import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css'

const NavBar = ({ user }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light" style={{ background: "green" }}>
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <Link class="navbar-brand mt-2 mt-lg-0" to="#">
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
        <div class="d-flex align-items-center">
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