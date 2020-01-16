import axios from 'axios'

// Constants
export const GET_ORDER = 'GET_ORDER'

//Action Creators
export const getOrder = order => ({type: GET_ORDER, order})

//Thunk Creators
//Add way to prevent user from viewing other users' orders. Should only be able to view own. Unless they are an admin
export const fetchOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOrder(data))
  } catch (err) {
    console.log(err)
  }
}

//Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
