//as of 1/16, not using this -Kristen

import axios from 'axios'

export const GET_CATEGORY = 'GET_CATEGORY'

export const getCategory = category => ({type: GET_CATEGORY, category})

//id=product Id
export const fetchCategory = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/categories/${id}`)
      const category = response.data
      const action = getCategory(category)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category
    default:
      return state
  }
}
