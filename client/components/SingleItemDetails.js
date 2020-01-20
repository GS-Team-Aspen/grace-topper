//top portion of SingleItem page with photo & item details
import React, {Fragment} from 'react'

// **Add Review button only displays if User is logged in

// **Need to get Category by itemId (for label)
export const SingleItemDetails = props => {
  const {imageUrl, name, description, review, add, currUser} = props
  const price = props.price
    ? props.price.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD'
      })
    : ''

  const ratingAvg = arr => {
    let ratingNums = 0
    for (let i = 0; i < arr.length; i++) {
      ratingNums += arr[i].rating
    }
    return ratingNums / arr.length
  }

  const avgRating = ratingAvg(review)
  const reviewDec = avgRating - Math.floor(avgRating)

  const createStarArr = num => {
    const starArr = []
    for (let i = 0; i < num; i++) {
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
          <div className="item-price">{price}</div>
          <div className="ui basic label mini" id="item-cat">
            Category
          </div>
          <div className="item-rating">
            {avgRating > 0 ? (
              createStarArr(Math.floor(avgRating)).map(i => {
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
            )}
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
