import React, {Component} from 'react'
import {connect} from 'react-redux'

//import postOrder from redux store

//to users: FORM - firstName, lastName, email
//to address: FORM - address
//to orderItems: quantity, salePrice, itemId (orderId auto assigned)
//to orders: status = carted, userId

//IF User info is in database, display with Edit button
//IF User wants to edit, or isn't in db, show form

class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: 0
      },
      email: ''
    }
    //**also to collect: cc info */
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
    this.props.postOrder(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      address: {street: '', city: '', state: '', zipCode: 0},
      email: ''
    })
  }

  render() {
    return (
      <div className="centered-parent">
        <div className="ui segment" id="form-segment-addS">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <h4 className="ui dividing header">Shipping Information</h4>
            <div className="field" id="name-wrapper">
              <label>Name</label>
              <div className="two fields">
                <div className="eight wide field">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="eight wide field">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="field" id="address-wrapper">
              <label>Shipping Address</label>
              <div className="two fields">
                <div className="twelve wide field">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={this.state.address.street}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="four wide field">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={this.state.address.city}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="two fields">
              <div className="two wide field">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={this.state.address.state}
                  onChange={this.handleChange}
                />
              </div>
              <div className="four wide field">
                <input
                  type="number"
                  name="zip"
                  placeholder="Zip Code"
                  value={this.state.address.zip}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <h4 className="ui dividing header">Billing Information</h4>

            <div className="fields">
              <div className="seven wide field">
                <label>Card Number</label>
                <input
                  type="text"
                  name="card[number]"
                  maxLength="16"
                  placeholder="Card #"
                />
              </div>
              <div className="three wide field">
                <label>CVC</label>
                <input
                  type="text"
                  name="card[cvc]"
                  maxLength="3"
                  placeholder="CVC"
                />
              </div>
              <div className="six wide field">
                <label>Expiration</label>
                <div className="two fields">
                  <div className="field">
                    <select
                      className="ui fluid search dropdown"
                      name="card[expire-month]"
                    >
                      <option value="">Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      name="card[expire-year]"
                      maxLength="4"
                      placeholder="Year"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h4 className="ui dividing header">Email Address</h4>
            <div className="sixteen wide field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui divider" />
            <button
              className="ui button"
              id="order-submit-button"
              type="submit"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     addStudent: order => dispatch(postOrder(order))
//   };
// };

export default CheckoutForm
