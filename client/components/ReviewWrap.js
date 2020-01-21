//Reviews for a specific item; bottom portion of SingleItem page
import React from 'react'
import ReviewCard from './ReviewCard'
import AddReviewForm from './AddReviewForm'

export default ({reviews, itemId, currUser}) => (
  <React.Fragment>
    <div className="single-item">
      <div id="review-list">
        <h4 className="ui reviews-header">Customer Reviews</h4>
        <div className="ui divider" />
        {reviews.length ? (
          reviews.map(review => (
            <div key={review.id}>
              <ReviewCard {...review} />
            </div>
          ))
        ) : (
          <div> No Reviews</div>
        )}
      </div>
    </div>
    <div className="single-item">
      {currUser.userType !== 'guest' ? (
        <AddReviewForm currUser={currUser} itemId={itemId} />
      ) : null}
    </div>
  </React.Fragment>
)
