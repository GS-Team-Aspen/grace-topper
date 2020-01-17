import React, {Component} from 'react'

//loads user name
//"postReview"
//item & user ids are sent with description & rating

class AddReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      raing: 0
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
    //
    this.props.postReview(this.state)
    this.setState({
      description: '',
      rating: ''
    })
  }

  render() {
    return (
      <div className="ui segment" id="review-form">
        <h4 className="ui reviews-header">Add Review</h4>
        <div className="ui divider" />

        <div className="review-cust">Customer: Kristen Andersen</div>
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
              <select className="ui fluid search dropdown" name="rating">
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

export default AddReviewForm
