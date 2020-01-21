import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})

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

export const addToCart = (itemId, orderId, quantity = 1) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/cart/add`, {
      itemId,
      orderId,
      quantity
    })
    dispatch(setCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const setQuantities = orderId => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders/cart/setQuantities', {orderId})
    dispatch(setCart(data))
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
    dispatch(setCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const purchase = (userId, orderId) => async dispatch => {
  try {
    const res = await axios.put('/api/orders/cart/purchase', {
      userId,
      orderId
    })
    if (res.status !== 208) {
      res.data[0].items = []
      dispatch(setCart(res.data[0]))
    }
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
    default:
      return state
  }
}
