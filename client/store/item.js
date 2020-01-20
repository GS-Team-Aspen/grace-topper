import axios from 'axios'

export const GET_ITEMS = 'GET_ITEMS'

export const getItems = items => ({type: GET_ITEMS, items})

const initialState = []

export const fetchItems = (page, limit) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items?page=${page}&limit=${limit}`)
    dispatch(getItems(data))
  } catch (err) {
    console.log(err)
  }
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    default:
      return state
  }
}
