import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = () => {
  return (
    <section id="carousel">
      <div id="carousel-text">
        <h1>WE ALL WEAR MANY HATS.</h1>
        <div id="button-wrapper">
          <Link to="/items">
            <button type="button" id="carousel-button" className="ui label">
              Find a New One
            </button>
          </Link>
        </div>
      </div>
      <div className="carousel-image">
        <img src="/hat-combo-3-sm.jpg" />
      </div>
    </section>
  )
}

export default Home
