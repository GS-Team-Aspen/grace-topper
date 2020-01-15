import React from 'react'
import {Link} from 'react-router-dom'

const ItemCard = props => {
  const {id, name, price, imageUrl} = props
  console.log(props)
  return (
    //hover on product card
    <div className="custom-card">
      <Link to={`/items/${id}`}>
        <div className="ui card">
          <div className="image">
            <img src={imageUrl} />
          </div>
          <div className="extra content">
            <span className="target-name">{`${name}`}</span>
            <span className="right floated">{`$ ${price}`}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemCard
