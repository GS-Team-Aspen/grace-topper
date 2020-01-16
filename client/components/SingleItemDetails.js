//top portion of SingleItem page with photo & item details
import React, {Fragment} from 'react'

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
          <div className="desc-label">
            <div className="ui mini basic label">Sombrero</div>
          </div>
          <div className="item-review-stars">
            [Reviews Component: Stars & # reviews]
          </div>

          <button
            type="submit"
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
