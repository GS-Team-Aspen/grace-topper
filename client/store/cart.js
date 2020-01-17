import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const ADD_CART = 'ADD_CART'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})
const addCart = cart => ({type: ADD_CART, cart})
/**
 * THUNK CREATORS
 */
export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart/${userId}`)
    dispatch(setCart(data[0]))
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = itemId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/cart/${itemId}/add`)
    dispatch(se)
  } catch (error) {
    console.log(err)
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
    dispatch(setCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const purchase = (userId, orderId) => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/cart/purchase', {
      userId,
      orderId
    })
    dispatch(setCart(data[0]))
  } catch (err) {
    console.error(err)
  }
}

export const removeItem = (itemId, orderId) => async dispatch => {
  try {
    const {data} = await axios.delete('/api/orders/cart/delete/', {
      data: {itemId, orderId}
    })
    dispatch(setCart(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_CART:
      return [...state, action.cart]
    default:
      return state
  }
}
