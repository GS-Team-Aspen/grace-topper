import axios from 'axios'

export const SET_REVIEW = 'SET_REVIEW'

export const setReview = review => ({type: SET_REVIEW, review})

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

const initialState = {}

export const singleReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return action.review
    default:
      return state
  }
}
