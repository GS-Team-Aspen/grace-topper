import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/order'
import {
  fetchCart,
  changeItemQuantity,
  purchase,
  removeItem
} from '../store/cart'

const ItemCard = props => {
  const {item} = props

  return (
    //hover on product card
    <div className="ui card">
      <div className="image">
        <img src={item.imageUrl} />
      </div>
      <Link to={`/items/${item.id}`}>
        <div className="extra content">
          <span className="target-name">{`${item.name} ${
            item.orderItem.quantity
          }`}</span>
        </div>
      </Link>
      <span className="right floated">
        {item.price.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD'
        })}
      </span>
      <div className="button-holder">
        Quantity:
        <div
          className="mini ui button"
          onClick={() =>
            this.changeQuantity(
              item.id,
              parseInt(item.orderItem.quantity) - 1,
              item.stock
            )
          }
        >
          -
        </div>
        <div className="ui input">
          <input
            className="quantity-input"
            onChange={event => this.handleChange(item.id, event, item.stock)}
            type="text"
            value={item.orderItem.quantity}
          />
        </div>
        <div
          className="mini ui button"
          onClick={() =>
            this.changeQuantity(
              item.id,
              parseInt(item.orderItem.quantity) + 1,
              item.stock
            )
          }
        >
          +
        </div>
      </div>
      <div
        className="ui negative button"
        onClick={() => this.handleRemove(item.id)}
      >
        Remove Item
      </div>
    </div>
  )
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  componentDidMount() {
    //this.props.fetchCart(this.props.userId)
    this.props.fetchCart(5)
  }

  handlePurchase(event) {
    event.preventDefault()
    //this.props.purchase(this.props.userId, this.props.cart.id)
    this.props.purchase(5, this.props.cart.id)
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
        <div>
          Total:{' '}
          {cart
            .reduce((a, c) => a + c.price * c.orderItem.quantity, 0)
            .toLocaleString(undefined, {style: 'currency', currency: 'USD'})}
        </div>
        <div className="ui button" onClick={this.handlePurchase}>
          Purchase Cart
        </div>
        {cart.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  changeQuantity: (orderId, itemId, newValue) =>
    dispatch(changeItemQuantity(orderId, itemId, newValue)),
  purchase: (userId, orderId) => dispatch(purchase(userId, orderId)),
  removeItem: (itemId, orderId) => dispatch(removeItem(itemId, orderId))
})

export default connect(mapState, mapDispatch)(Cart)
