//top portion of SingleItem page with photo & item details
import React, {Fragment} from 'react'
import {addToCart} from '../store/cart'

// **Need to get Category by itemId (for label)
const SingleItemDetails = props => {
  const {imageUrl, name, description, review, add} = props

  const ratingAver = arr => {
    let ratingNums = 0
    for (let i = 0; i < arr.length; i++) {
      ratingNums += arr[i].rating
    }
    return ratingNums / arr.length
  }

  console.log(props, 'in single item details')

  const reviewsAvgRating = ratingAver(review)

  const createStarArrDecimal = num => {
    const integer = Math.floor(num)
    const decimal = num - integer
    const starArr = []
    for (let i = 1; i <= integer; i++) {
      starArr.push(i)
    }
    //9 as last item signals need for half star
    if (decimal > 0.25 || decimal < 0.75) {
      starArr.push(9)
    } else {
      starArr.push(8)
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
            {`Average Rating: ${reviewsAvgRating}`}
          </div>
          <button
            type="submit"
            id="1"
            className="ui label submit-button"
            onClick={() => {
              add(props.name) && console.log('clicked')
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
