import axios from 'axios'

// Constants
export const GET_ORDERS = 'GET_ORDERS'

//Action Creators
export const getOrders = orders => ({type: GET_ORDERS, orders})

//Thunk Creators
//Add arguments for user ID to filter orders
export const fetchOrders = (user, page, limit) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/orders?page=${page}&limit=${limit}`,
      user
    )
    dispatch(getOrders(data.data))
  } catch (err) {
    console.log(err)
  }
}

//Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
