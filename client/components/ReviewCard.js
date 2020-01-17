import React from 'react'

const ReviewCard = props => {
  const {createdAt, rating, description} = props

  const formatDate = date => {
    const miniDate = date.slice(0, 10).split('-')
    const finalDate = []
    finalDate.push(miniDate[1])
    finalDate.push('-', miniDate[2], '-')
    finalDate.push(miniDate[0])
    return finalDate
  }
  console.log(props)
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
        {props.user ? (
          <div className="review-author">{`${props.user.firstName} ${
            props.user.lastName
          }`}</div>
        ) : (
          <div />
        )}
        <div className="review-date">{formatDate(createdAt)}</div>
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
