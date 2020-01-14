import axios from 'axios'
import history from '../history'

export const GET_ITEMS = 'GET_ITEMS'

export const getItems = items => ({type: GET_ITEMS, items})

export const fetchItems = () => {
  return async dispatch => {
    const response = await axios.get('api/items')
    const items = response.data
    dispatch(getItems(items))
  }
}

export const itemsReducter = (items = [], action) => {
  switch (action.type) {
    case GET_ITEMS:
      return [...action.items]
    default:
      return items
  }
}
