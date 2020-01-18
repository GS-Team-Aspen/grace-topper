import React from 'react'
import {Link} from 'react-router-dom'

const ItemCard = props => {
  const {id, name, imageUrl} = props
  const price = props.type === 'order' ? props.orderItem.salePrice : props.price
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
            <span className="target-name">{`${name} ${quantity}`}</span>
            <span className="right floated">{`$ ${price}`}</span>
          </div>
          {/* Add to Cart button goes here */}
        </div>
      </Link>
      {props.user.admin ? (
        <button
          type="submit"
          className="ui label submit-button"
          //   onClick={() => removeItem (id)}
        >
          <i className="minus square icon" />
          Admin Remove Item
        </button>
      ) : (
        <button
          type="submit"
          className="ui label submit-button"
          //   onClick={() => additem (id)}
        >
          <i className="minus plus icon" />
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default ItemCard
