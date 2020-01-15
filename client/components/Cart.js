import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import {fetchCart, changeItemQuantity} from '../store/cart'

const AddButton = ({change}) => <div onClick={() => change(1)}>+</div>

const RemoveButton = ({change}) => <div onClick={() => change(-1)}>-</div>

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.changeQuantity = this.changeQuantity.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(2)
  }

  changeQuantity(itemId, change) {
    this.props.changeQuantity(this.props.cart.id, itemId, change)
  }

  render() {
    const cart = this.props.cart.items ? this.props.cart.items : []
    return (
      <div>
        {cart.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} />
            <div>
              {item.name} ${item.price}
            </div>
            <div>
              <div>Stock: {item.orderItem.quantity}</div>
              <RemoveButton change={this.changeQuantity} />
              <AddButton
                change={change => this.changeQuantity(item.id, change)}
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
  changeQuantity: (orderId, itemId, change) =>
    dispatch(changeItemQuantity(orderId, itemId, change))
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
