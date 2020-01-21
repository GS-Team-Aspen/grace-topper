import axios from 'axios'
import {fetchSingleItem} from './singleItem'

export const GET_ITEMS = 'GET_ITEMS'
export const EDIT_ITEM = 'EDIT_ITEM'

export const getItems = items => ({type: GET_ITEMS, items})
export const editItem = items => ({type: EDIT_ITEM, items})

const initialState = {}

export const fetchItems = () => {
  return async dispatch => {
    try {
      const response = await axios.get('../api/items')
      const items = response.data
      const action = getItems(items)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const modItem = (id, state) => {
  return async dispatch => {
    try {
      const response = await axios.put(`../api/items/${id}`, state)
      console.log(response, 'in item store')
      const editedItem = response.data
      const action = editItem(editedItem)
      dispatch(action)
      dispatch(fetchSingleItem(id))
    } catch (err) {
      console.log(err)
    }
  }
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    case EDIT_ITEM:
      console.log('in item store', action.items[1])
      console.log('first index', state[0])
      const filterItems = state.filter(item => item.id !== action.items[1].id)
      return [...filterItems, action.items[1]]
    default:
      return state
  }
}
