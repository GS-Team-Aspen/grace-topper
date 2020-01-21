import React from 'react'
import {Link} from 'react-router-dom'

const ItemCard = props => {
  const {id, name, imageUrl} = props
  const price = (props.type === 'order'
    ? props.orderItem.salePrice * props.orderItem.quantity
    : props.price
  ).toLocaleString(undefined, {style: 'currency', currency: 'USD'})
  const quantity = props.type === 'order' ? `x${props.orderItem.quantity}` : ''

  return (
    //hover on product card
    <div className="custom-card">
      <Link to={`/items/${id}`}>
        <div className="ui card">
          <div className="image">
            <img src={imageUrl} />
          </div>
          <div className="extra content">
            <span className="target-name-card">{`${name} ${quantity}`}</span>
            <span className="right floated">{price}</span>
          </div>
          {/* Add to Cart button goes here */}
        </div>
      </Link>
    </div>
  )
}

export default ItemCard
