//top portion of SingleItem page with photo & item details
import React, {Fragment} from 'react'

// **Need to get Category by itemId (for label)
const SingleItemDetails = props => {
  const {imageUrl, name, description, rating} = props

  return (
    <Fragment>
      <div className="single-item">
        <div className="item-image">
          <img src={imageUrl} />
        </div>
        <div className="item-details">
          <div className="target-name">{name}</div>
          <div className="item-desc">{description}</div>
          {props.category ? (
            <div className="desc-label">
              <div className="ui mini basic label">{props.category.name}</div>
            </div>
          ) : (
            <div>''</div>
          )}

          <div className="item-review-stars">
            [Reviews Component: Stars (partial?) & # reviews]
          </div>
          <div id="button-wrapper">
            <button
              type="submit"
              id="add-review"
              className="ui label submit-button"

              //   scrolls to add review fields at bottom of ReviewWrap component
            >
              <i className="pen square icon" />
              Add Review
            </button>
          </div>
          <button
            type="submit"
            id="add-cart-item"
            className="ui label submit-button"
            //   onClick={() => ADD TO CART (id)}
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
