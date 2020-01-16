import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import {fetchCart, changeItemQuantity, purchase} from '../store/cart'

const AddButton = ({change}) => <div onClick={() => change(1)}>+</div>

const RemoveButton = ({change}) => <div onClick={() => change(-1)}>-</div>

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(2)
  }

  handleSubmit(event) {
    event.preventDefault()
    //	this.props.purchase(this.props.userId, this.props.cart.id)
    this.props.purchase(2, this.props.cart.id)
  }

  changeQuantity(itemId, newValue, quantity) {
    if (newValue <= quantity)
      this.props.changeQuantity(this.props.cart.id, itemId, newValue)
    else console.log('not enough in stock')
  }

  handleChange(itemId, event, quantity) {
    this.changeQuantity(itemId, event.target.value, quantity)
  }

  render() {
    const cart = this.props.cart.items ? this.props.cart.items : []
    return (
      <div>
        <div>
          Total: {cart.reduce((a, c) => a + c.price * c.orderItem.quantity, 0)}
        </div>
        <div onClick={this.handleSubmit}>Purchase Cart</div>
        {cart.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} />
            <div>
              {item.name} ${item.price}
            </div>
            <div>
              Quantity:
              <input
                onChange={event =>
                  this.handleChange(item.id, event, item.stock)
                }
                type="text"
                value={item.orderItem.quantity}
              />
              <RemoveButton
                change={change =>
                  this.changeQuantity(
                    item.id,
                    item.orderItem.quantity + change,
                    item.stock
                  )
                }
              />
              <AddButton
                change={change =>
                  this.changeQuantity(
                    item.id,
                    item.orderItem.quantity + change,
                    item.stock
                  )
                }
              />
            </div>
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
  purchase: (userId, orderId) => dispatch(purchase(userId, orderId))
})

export default connect(mapState, mapDispatch)(Cart)

/* const Cart = ({fetchCart}) => {
 *     useEffect(() => {
 * 	fetchCart(1)
 *     }, 1)
 *     
 *     return (
 *     <div>
 * 	{fakeCart.map(item => (
 *       <div>
 *         <img src={item.imageUrl} />
 *         <div>
 *           {item.name} ${item.price}
 *         </div>
 *         <div>Stock: {item.stock}</div>
 *         <div>{item.description}</div>
 *       </div>
 *     ))}
 *   </div>)
 * }
 *  */
