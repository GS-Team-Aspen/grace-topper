import axios from 'axios'
import {fetchSingleItem} from './singleItem'

const GET_ITEMS = 'GET_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const ADD_REVIEW = 'ADD_REVIEW'

const getItems = items => ({type: GET_ITEMS, items})
const deleteItem = itemId => ({type: DELETE_ITEM, itemId})
const addItem = item => ({type: ADD_ITEM, item})
const addReview = item => ({type: ADD_REVIEW, item})

const initialState = []

export const fetchItems = (page, limit) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items?page=${page}&limit=${limit}`)
    dispatch(getItems(data))
  } catch (err) {
    console.log(err)
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

export const setReview = (userId, itemId, review) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reviews', {userId, itemId, review})
      dispatch(addReview(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const makeItem = itemInfo => {
  return async dispatch => {
    try {
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
    case ADD_REVIEW:
      return [...state.filter(item => item.id !== action.item.id), action.item]
    default:
      return state
  }
}
