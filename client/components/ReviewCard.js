import React from 'react'

const ReviewCard = props => {
  const {user, createdAt, rating, description} = props
  return (
    <div className="ui comments comments-panel">
      <div className="comment">
        <div className="content">
          <a className="author">{user}</a>
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
          <div className="text">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
