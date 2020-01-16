import React, {Component, Fragment} from 'react'
import {resetWarningCache} from 'prop-types'
// import {fetchReviews} from './../store/reviews'
// import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'

class ReviewWrap extends Component {
  // componentDidMount() {
  //  **matching itemId received as props from SingleItemWrapper, or:
  //   const itemId = Number(this.props.match.params.id)
  //   this.props.loadReviews(itemId)
  // }
  //inherit user name from props

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
    console.log('review', this.props)
    return (
      <div className="centered-parent">
        <div className="ui small comments">
          <h4 className="ui comments-header">Customer Reviews</h4>
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

export default ReviewWrap

// const mapStateToProps = state => {
//   return {
//     reviews: state.reviews
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadReviews: itemId => dispatch(fetchReviews(itemId))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReviewWrap)
