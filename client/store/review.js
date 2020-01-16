import axios from 'axios'
import history from '../history'

export const GET_ITEM_REVIEWS = 'GET_ITEM_REVIEWS'

export const getItemReviews = reviews => ({type: GET_ITEM_REVIEWS, reviews})

const initialState = {}

export const fetchItemReviews = itemId => {
  return async dispatch => {
    try {
      const response = await axios.get(`../api/reviews/${itemId}`)
      const {data} = response
      const action = getItemReviews(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
