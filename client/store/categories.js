import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CATEGORIES = 'SET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const setCategories = categories => ({type: SET_CATEGORIES, categories})
const addCategory = category => ({type: ADD_CATEGORY, category})
const removeCategory = categoryId => ({type: REMOVE_CATEGORY, categoryId})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/categories`)
    dispatch(setCategories(data))
  } catch (err) {
    console.error(err)
  }
}

export const setCategory = categoryName => async dispatch => {
  try {
    const {data} = await axios.post(`/api/categories/add`, {categoryName})
    dispatch(addCategory(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteCategory = categoryId => async dispatch => {
  try {
    await axios.delete('/api/categories/delete', {
      data: {categoryId}
    })
    dispatch(removeCategory(categoryId))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    case ADD_CATEGORY:
      return [...state, action.category]
    case REMOVE_CATEGORY:
      return state.filter(category => category.id !== action.categoryId)
    default:
      return state
  }
}
