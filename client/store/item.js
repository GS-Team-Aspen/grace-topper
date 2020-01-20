import axios from 'axios'

export const GET_ITEMS = 'GET_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'

export const getItems = items => ({type: GET_ITEMS, items})
const deleteItem = itemId => ({type: DELETE_ITEM, itemId})
const addItem = item => ({type: ADD_ITEM, item})

const initialState = {}

export const fetchItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/items')
      dispatch(getItems(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeItem = (itemId, history) => {
  return async dispatch => {
    try {
      await axios.delete('/api/items', {data: {itemId}})
      dispatch(deleteItem(itemId))
      history.push('/items')
    } catch (err) {
      console.error(err)
    }
  }
}

export const makeItem = itemInfo => {
  return async dispatch => {
    try {
      console.log(itemInfo)
      const {data} = await axios.post('/api/items', {itemInfo})
      dispatch(addItem(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    case ADD_ITEM:
      return [...state, action.item]
    case DELETE_ITEM:
      return state.filter(item => item.id !== action.itemId)
    default:
      return state
  }
}
