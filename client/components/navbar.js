import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, firstName}) => (
  <div className="navbar">
    <div className="logo-wrapper">
      <Link to="/home">
        <div>
          <img
            id="logo"
            src="http://kristenandersen.online/gh/gh-logo-white.png"
          />
        </div>
      </Link>
    </div>
    <div className="nav-wrapper">
      <div className="welcome">
        {isLoggedIn ? `Welcome, ${firstName}` : `Welcome, Guest`}
      </div>
      <nav>
        <span className="nav-general">
          <Link to="/items">Store</Link>
          <Link to="/cart">Cart</Link>
        </span>
        {isLoggedIn ? (
          <span className="nav-loggedin">
            {/* The navbar will show these links after you log in */}
            <Link to="/orders">My Orders</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </span>
        ) : (
          <span>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </span>
        )}
      </nav>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.userType !== 'guest',
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
