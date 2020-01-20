//Reviews for a specific item; bottom portion of SingleItem page
import React, {Component, Fragment} from 'react'
import {fetchItemReviews} from '../store/review'
import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'
import AddReviewForm from './AddReviewForm'

// **AddReviewForm only displays if User is logged in

class ReviewWrap extends Component {
  //  **set up to receive itemId as props from SingleItemWrapper, or get from match params:
  // componentDidMount() {
  //   const itemId = Number(this.props.itemId)
  //   this.props.loadReviews(itemId)
  // }

  render() {
    //changes 'reviews' props from obj of objs to an arr of objs, so .map can iterate over it
    //'rev' func was written before currUser needed to be brought in to ReviewWrap to control whether AddReviewForm component renders. Given some limitations, the best way I could find to modify 'rev' to exclude currUser was to remove currUser from the returned arr, since currUser will be last.
    //in current v of db, condition should be: currUser.firstName === 'admin' || currUser.firstName === 'Guest', but I need to see form for dev

    const rev = nestObj => {
      const nestArr = Object.entries(nestObj)
      let result = []
      for (let i = 0; i < nestArr.length; i++) {
        result.push(nestArr[i][1])
      }
      return result.slice(0, -1)
    }

    const reviews = rev(this.props)
    const {currUser} = this.props
    //console.log('REV WRAP', reviews)
    return (
      <Fragment>
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
        <div className="single-item">
          {/* Will need to edit this verification line */}
          {currUser.firstName === 'admin' ? <AddReviewForm /> : ''}
        </div>
      </Fragment>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadReviews: itemId => dispatch(fetchItemReviews(itemId))
//   }
// }

export default ReviewWrap

//export default connect(mapStateToProps)(ReviewWrap)
