//top portion of SingleItem page with photo & item details
import React, {Fragment} from 'react'
import {addToCart} from '../store/cart'

// **Need to get Category by itemId (for label)
const SingleItemDetails = props => {
  const {imageUrl, name, description, review, add, id} = props

  const ratingAver = arr => {
    let ratingNums = 0
    for (let i = 0; i < arr.length; i++) {
      ratingNums += arr[i].rating
    }
    return ratingNums / arr.length
  }

  const reviewsAvgRating = ratingAver(review)
  const reviewDec = reviewsAvgRating - Math.floor(reviewsAvgRating)
  const wholeReview = Math.ceil(reviewsAvgRating)

  const createStarArr = num => {
    const starArr = []
    for (let i = 1; i < num; i++) {
      starArr.push(i)
    }
    return starArr
  }

  return (
    <Fragment>
      <div className="single-item">
        <div className="item-image">
          <img src={imageUrl} />
        </div>
        <div className="item-details">
          <div className="target-name">{name}</div>
          <div className="item-desc">{description}</div>
          <div className="item-rating">
            {reviewsAvgRating > 0 ? (
              createStarArr(wholeReview).map(i => {
                return (
                  <span key={i}>
                    <i className="star icon" />
                  </span>
                )
              })
            ) : (
              <h1>No Reviews</h1>
            )}
            {reviewDec > 0.25 && reviewDec < 0.75 ? (
              <span>
                <i className="half star icon" />
              </span>
            ) : (
              ''
            )}
          </div>
          <button
            type="submit"
            id="1"
            className="ui label submit-button"
            onClick={() => {
              add() && console.log('clicked')
            }}
          >
            <i className="plus square icon" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="ui divider" />
    </Fragment>
  )
}

export default SingleItemDetails
