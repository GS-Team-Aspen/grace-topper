import React from 'react'

const ReviewCard = props => {
  const {user, createdAt, rating, description} = props

  //   this doesn't handle non-integers (half-stars)
  const createStarArr = num => {
    const starArr = []
    for (let i = 1; i < num; i++) {
      starArr.push(i)
    }
    return starArr
  }

  //**need to re-format date */
  return (
    <div className="review-card">
      <div className="review-info">
        <div className="review-author">{user}</div>
        <div className="review-date">{createdAt.slice(0, 10)}</div>
        <div className="review-rating">
          <i className="star icon" />
          {createStarArr(rating).map(el => {
            return (
              <span key={el}>
                <i className="star icon" />
              </span>
            )
          })}
        </div>
      </div>
      <div className="text review-text">{description}</div>
    </div>
  )
}

export default ReviewCard
