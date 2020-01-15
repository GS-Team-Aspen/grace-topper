import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})

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

export const changeItemQuantity = (itemId, change) => async dispatch => {
  try {
    await axios.put('/api/orders/cart/changeQuantity', {itemId, change})
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
    default:
      return state
  }
}
