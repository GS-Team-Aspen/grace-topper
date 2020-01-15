/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = null

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})

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
