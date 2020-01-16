import React from 'react'

const ReviewCard = props => {
  const {user, createdAt, rating, description} = props
  return (
    <div className="ui comments review-card">
      <div className="comment">
        <div className="content">
          <div className="author">{user}</div>
          <div className="metadata">
            <div className="date">{createdAt.slice(0, 10)}</div>
            <div className="rating">
              <i className="star icon" />
              {/* {
                  for (let i = 0; i < rating; i++){
                    return (
                      <i class="star icon"></i>
                    )
                  }
                } */}
            </div>
          </div>
          <div className="text review-text">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
