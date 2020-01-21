import axios from 'axios'

const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM'
const CHANGE_ITEM = 'CHANGE_ITEM'

const getSingleItem = item => ({type: GET_SINGLE_ITEM, item})
const changeItem = item => ({type: CHANGE_ITEM, item})

const initialState = {}

export const fetchSingleItem = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/items/${id}`)
      const item = response.data
      const action = getSingleItem(item)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const modItem = (id, state) => {
  return async dispatch => {
    try {
      console.log(state, id)
      const {data} = await axios.put(`/api/items/${id}`, state)
      dispatch(changeItem(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const singleItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ITEM:
      return action.item
    case CHANGE_ITEM:
      return {
        ...action.item,
        reviews: state.reviews,
        categories: state.categories
      }
    default:
      return state
  }
}
