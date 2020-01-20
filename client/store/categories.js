//as of 1/16, not using this -Kristen

import axios from 'axios'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = categories => ({type: GET_CATEGORIES, categories})

//id=product Id
export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/categories/`)
      dispatch(getCategories(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
