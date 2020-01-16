//Reviews for a specific item; bottom portion of SingleItem page
import React, {Component} from 'react'
import {fetchItemReviews} from './../store/review'
import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'

class ReviewWrap extends Component {
  //  **set up to receive itemId as props from SingleItemWrapper, or get from match params:
  // componentDidMount() {
  //   const itemId = Number(this.props.itemId)
  //   this.props.loadReviews(itemId)
  // }
  //**need to access Review info for a specific item, from global state */
  //**need to access user name associated with userId */
  //**could use userId to get a total # of their reviews (to display by their name in ReviewCard) */

  render() {
    console.log(this.props, 'in reviewwrap render')
    const reviews = this.props

    return (
      <div className="single-item">
        <div id="review-list">
          <h4 className="ui reviews-header">Customer Reviews</h4>
          <div className="ui divider" />
          {reviews.length ? (
            reviews.map(review => {
              return (
                <div key={review.id}>
                  <ReviewCard {...review} />
                </div>
              )
            })
          ) : (
            <div> No Reviews</div>
          )}
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     reviews: state.review
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadReviews: itemId => dispatch(fetchItemReviews(itemId))
//   }
// }

export default ReviewWrap
