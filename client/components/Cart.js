import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {changeItemQuantity, removeItem, setQuantities} from '../store/cart'

const ItemCard = props => {
  const {item, handleChange, handleRemove, changeQuantity} = props

  return (
    //hover on product card
    <div className="cart-item">
      <div className="ui fluid card">
        <div className="image">
          <img src={item.imageUrl} />
          <span
            className="
            floated ui green right ribbon label"
          >
            {item.price.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD'
            })}
          </span>
        </div>
        <Link to={`/items/${item.id}`}>
          <div className="extra content">
            <span className="target-name">{item.name}</span>
          </div>
        </Link>
        <div />
        <div className="button-holder">
          <div
            className="mini ui button"
            onClick={() =>
              changeQuantity(
                item.id,
                parseInt(item.orderItem.quantity, 10) - 1,
                item.stock
              )
            }
          >
            -
          </div>
          <input
            className="quantity-input"
            onChange={event => handleChange(item.id, event, item.stock)}
            type="text"
            value={item.orderItem.quantity}
          />
          <div
            className="mini ui button"
            onClick={() =>
              changeQuantity(
                item.id,
                parseInt(item.orderItem.quantity, 10) + 1,
                item.stock
              )
            }
          >
            +
          </div>
        </div>
        <div
          className="small ui red button"
          onClick={() => handleRemove(item.id)}
        >
          Remove Item
        </div>
      </div>
    </div>
  )
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.loaded = false
    this.changeQuantity = this.changeQuantity.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    if (this.props.cart.id) {
      this.props.setQuantities(this.props.cart.id)
      this.loaded = true
    }
  }

  componentDidUpdate() {
    if (!this.loaded && this.props.cart.id) {
      this.props.setQuantities(this.props.cart.id)
      this.loaded = true
    }
  }

  changeQuantity(itemId, newValue, quantity) {
    if (newValue <= quantity)
      this.props.changeQuantity(this.props.cart.id, itemId, newValue)
    else console.log('not enough in stock')
  }

  handleChange(itemId, event, quantity) {
    this.changeQuantity(itemId, event.target.value, quantity)
  }

  handleRemove(itemId) {
    this.props.removeItem(itemId, this.props.cart.id)
  }

  render() {
    const cart = this.props.cart.items ? this.props.cart.items : []
    return (
      <div>
        <h3>
          Total:{' '}
          {cart
            .reduce((a, c) => a + c.price * c.orderItem.quantity, 0)
            .toLocaleString(undefined, {style: 'currency', currency: 'USD'})}
        </h3>
        <button
          type="purchase-button"
          className="ui green button"
          onClick={() => this.props.history.push('/checkout')}
        >
          Purchase Cart
        </button>
        {cart.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            changeQuantity={this.changeQuantity}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
          />
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  changeQuantity: (orderId, itemId, newValue) =>
    dispatch(changeItemQuantity(orderId, itemId, newValue)),
  removeItem: (itemId, orderId) => dispatch(removeItem(itemId, orderId)),
  setQuantities: orderId => dispatch(setQuantities(orderId))
})

export default connect(mapState, mapDispatch)(Cart)
