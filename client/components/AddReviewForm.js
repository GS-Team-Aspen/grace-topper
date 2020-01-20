import React, {Component} from 'react'

import {connect} from 'react-redux'
import {setReview} from '../store/item'
//item & user ids are sent with description & rating

class AddReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      rating: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const userId = this.props.currUser.id
    const itemId = this.props.itemId
    this.props.postReview(userId, itemId, this.state)

    this.setState({
      description: '',
      rating: ''
    })
  }

  render() {
    const {currUser} = this.props

    return (
      <div className="ui segment" id="review-form">
        <h4 className="ui reviews-header">Add Review</h4>
        <div className="ui divider" />

        <div className="review-cust">
          {currUser ? (
            `Customer: ${currUser.firstName} ${currUser.lastName}`
          ) : (
            <span />
          )}
        </div>

        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field sixteen wide">
            <textarea
              type="text"
              name="description"
              placeholder="Write your review here..."
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="field sixteen wide">
            <div className="field four wide">
              <select
                className="ui fluid search dropdown"
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
              >
                <option value="">Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <button
            className="ui right floated button"
            id="order-submit-button"
            type="submit"
          >
            Submit Review
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.user,
    currItem: state.singleItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postReview: (userId, itemId, review) =>
      dispatch(setReview(userId, itemId, review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm)
