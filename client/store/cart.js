import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const CHANGE_ORDER_ITEM = 'CHANGE_ORDER_ITEM'
const PURCHASE_CART = 'PURCHASE_CART'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const changeOrderItem = (orderItem, itemId) => ({
  type: CHANGE_ORDER_ITEM,
  orderItem,
  itemId
})
const purchaseCart = cart => ({type: PURCHASE_CART, cart})

/**
 * THUNK CREATORS
 */
export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart/${userId}`)
    dispatch(getCart(data[0]))
  } catch (err) {
    console.error(err)
  }
}

export const changeItemQuantity = (
  orderId,
  itemId,
  newValue
) => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/cart/changeQuantity', {
      orderId,
      itemId,
      newValue
    })
    dispatch(changeOrderItem(data, itemId))
  } catch (err) {
    console.error(err)
  }
}

export const purchase = (userId, orderId) => async dispatch => {
  try {
    console.log('user', userId, 'order', orderId)
    const {data} = await axios.put('/api/orders/cart/purchase', {
      userId,
      orderId
    })
    dispatch(purchaseCart(data[0]))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case CHANGE_ORDER_ITEM:
      const newItem = {
        ...state.items.filter(item => item.id === action.itemId)[0],
        orderItem: action.orderItem
      }
      const items = state.items.map(item => {
        if (item.id === action.itemId) return newItem
        return item
      })
      return {...state, items}
    case PURCHASE_CART:
      return action.cart
    default:
      return state
  }
}
