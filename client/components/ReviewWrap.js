//Reviews for a specific item; bottom portion of SingleItem page
import React, {Component} from 'react'
import {fetchItemReviews} from './../store/review'
import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'

class ReviewWrap extends Component {
  //  **set up to receive itemId as props from SingleItemWrapper, or get from match params:
  componentDidMount() {
    const itemId = Number(this.props.itemId)
    this.props.loadReviews(itemId)
  }
  //**need to access Review info for a specific item, from global state */
  //**need to access user name associated with userId */
  //**could use userId to get a total # of their reviews (to display by their name in ReviewCard) */

  render() {
    const reviews = [
      {
        id: 1,
        rating: 3,
        description:
          'Sed voluptatem et omnis amet minus. Asperiores est nobis aut id fuga sed. Corrupti laborum quae voluptatum expedita ut. Placeat mollitia tempora quia accusantium ratione dolore omnis qui. Ex aliquam numquam accusamus tempora eos exercitationem beatae quae. Magnam voluptas autem molestias error tempora cupiditate aut iure.',
        createdAt: '2020-01-15 16:49:07.355-06',
        user: 'Kristen A.',
        itemId: 1
      },
      {
        id: 2,
        rating: 4,
        description:
          'Debitis qui natus dolorem in fugit. Consequuntur suscipit enim dicta commodi eligendi rerum non distinctio. Quo iusto voluptates numquam. Voluptatibus sit ducimus nisi reiciendis sit iusto. Assumenda quia rerum.',
        createdAt: '2019-09-09 11:30:07.354-06',
        user: 'Penelope Q.',
        itemId: 2
      }
    ]

    return (
      <div className="single-item">
        <div id="review-list">
          <h4 className="ui reviews-header">Customer Reviews</h4>
          <div className="ui divider" />
          {/* {reviews.length ? (
            reviews.map(review => {
              return (
                <div key={review.id}>
                  <ReviewCard {...review} />
                </div>
              )
            })
          ) : (
            <div> No Reviews</div>
          )} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.review
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadReviews: itemId => dispatch(fetchItemReviews(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWrap)
