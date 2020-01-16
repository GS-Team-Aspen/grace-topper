import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import {
  fetchCart,
  changeItemQuantity,
  purchase,
  removeItem
} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.userId)
  }

  handlePurchase(event) {
    event.preventDefault()
    this.props.purchase(this.props.userId, this.props.cart.id)
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
    this.props.removeItem(itemId)
  }

  render() {
    const cart = this.props.cart.items ? this.props.cart.items : []
    console.log(cart, this.props.cart.items)
    return (
      <div>
        <div>
          Total:{' '}
          {cart
            .reduce((a, c) => a + c.price * c.orderItem.quantity, 0)
            .toLocaleString(undefined, {style: 'currency', currency: 'USD'})}
        </div>
        <div onClick={this.handlePurchase}>Purchase Cart</div>
        {cart.map(item => (
          <div key={item.id} className="custom-card">
            <img src={item.imageUrl} />
            <div>
              {item.name}{' '}
              {item.price.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD'
              })}
            </div>
            <div className="button-holder">
              Quantity:
              <div
                onClick={() =>
                  this.changeQuantity(
                    item.id,
                    parseInt(item.orderItem.quantity) - 1,
                    item.stock
                  )
                }
              >
                {' '}
                -{' '}
              </div>
              <input
                className="quantity-input"
                onChange={event =>
                  this.handleChange(item.id, event, item.stock)
                }
                type="text"
                value={item.orderItem.quantity}
              />
              <div
                onClick={() =>
                  this.changeQuantity(
                    item.id,
                    parseInt(item.orderItem.quantity) + 1,
                    item.stock
                  )
                }
              >
                {' '}
                +{' '}
              </div>
            </div>
            <div onClick={() => this.handleRemove(item.id)}>Remove Item</div>
            <div>{item.description}</div>
          </div>
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
  fetchCart: userId => dispatch(fetchCart(userId)),
  changeQuantity: (orderId, itemId, newValue) =>
    dispatch(changeItemQuantity(orderId, itemId, newValue)),
  purchase: (userId, orderId) => dispatch(purchase(userId, orderId)),
  removeItem: itemId => dispatch(removeItem(itemId))
})

export default connect(mapState, mapDispatch)(Cart)
