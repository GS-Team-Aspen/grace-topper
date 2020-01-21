import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const SET_ORDERS = 'SET_ORDERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})
const removeOrder = () => ({type: REMOVE_ORDER})
const setOrders = orders => ({type: SET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const fetchOrders = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/orderHistory/${userId}`)
    dispatch(setOrders(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case REMOVE_ORDER:
      return state
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
