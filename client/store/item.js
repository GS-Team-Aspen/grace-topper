import axios from 'axios'

const GET_ITEMS = 'GET_ITEMS'

const getItems = items => ({type: GET_ITEMS, items})

const initialState = {
  count: null,
  data: []
}

export const fetchItems = (page, limit, category, search) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/items?page=${page}&limit=${limit}&category=${category}&search=${search.toLowerCase()}`
    )
    dispatch(getItems(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeItem = (itemId, history) => {
  return async dispatch => {
    try {
      await axios.delete('/api/items', {data: {itemId}})
      history.push('/items')
    } catch (err) {
      console.error(err)
    }
  }
}

export const makeItem = itemInfo => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/items', {itemInfo})
    } catch (err) {
      console.error(err)
    }
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
