import axios from 'axios'

export const GET_ITEM_REVIEWS = 'GET_ITEM_REVIEWS'
export const SET_REVIEW = 'SET_REVIEW'

export const getItemReviews = reviews => ({type: GET_ITEM_REVIEWS, reviews})
export const setReview = review => ({type: SET_REVIEW, review})

const initialState = []

export const fetchItemReviews = itemId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/reviews/${itemId}`)
      const {data} = response
      const action = getItemReviews(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const addReview = (userId, itemId, review) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reviews', {userId, itemId, review})
      dispatch(setReview(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_REVIEWS:
      return action.reviews
    case SET_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
