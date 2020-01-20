//top portion of SingleItem page with photo & item details
import React, {Fragment} from 'react'

// **Need to get Category by itemId (for label)
export const SingleItemDetails = props => {
  const {imageUrl, name, description, price, review, add, currUser} = props

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
          <div className="item-price">{`$${price}.00`}</div>
          <div className="ui basic label mini" id="item-cat">
            Category
          </div>
          <div className="item-rating">
            {reviewsAvgRating > 0 ? (
              createStarArr(wholeReview).map(i => {
                return (
                  <span key={i}>
                    <i className="star icon star-yellow" />
                  </span>
                )
              })
            ) : (
              <h5 style={{fontStyle: 'oblique'}}>No Reviews</h5>
            )}
            {reviewDec > 0.25 && reviewDec < 0.75 ? (
              <span>
                <i className="half star icon star-yellow" />
              </span>
            ) : (
              ''
            )}{' '}
          </div>

          {currUser.firstName !== 'Guest' ? (
            <div id="button-wrapper">
              <a href="#review-form">
                <button type="button" id="add-review" className="ui label">
                  <i className="pen square icon" />
                  Add Review
                </button>
              </a>
            </div>
          ) : (
            ''
          )}

          <button
            type="submit"
            id="add-cart-item"
            className="ui label submit-button"
            onClick={() => add()}
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
