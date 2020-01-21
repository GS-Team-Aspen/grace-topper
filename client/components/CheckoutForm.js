import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {purchase} from './../store/cart'

//Notes:
// purchase shifts status carted > shipped, creates new "cart"
//If user is logged in (& name, address & email is on file), 'Shipping Information' section is hidden

//**To do:
//Address of logged-in user needs to be accessed from state
//need format/back end for CC info; may replace CC input fields with Stripe components

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

    this.handleChange = this.handleChange.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handlePurchase(event) {
    event.preventDefault()
    this.props.purchase(this.props.user.id, this.props.cart.id)
  }

  render() {
    const {user} = this.props

    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          {user.userType === 'guest' ? (
            <Fragment>
              <Fragment>
                <h4 className="ui dividing header" id="shipping-top">
                  Shipping Information
                </h4>
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
              </Fragment>
              <Fragment>
                <div className="field" id="address-wrapper">
                  <label>Address</label>
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
              </Fragment>
              <Fragment>
                <h4 className="ui dividing header">Email Address</h4>
                <div id="email-wrapper">
                  <div className="ten wide field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Fragment>
            </Fragment>
          ) : (
            <span />
          )}
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
              <div className="two fields">
                <div className="field">
                  <label>Expiration</label>
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
                  <label>Year</label>
                  <input
                    type="text"
                    name="card[expire-year]"
                    maxLength="4"
                    placeholder="4 digits"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className="ui right floated button"
            id="order-submit-button"
            type="submit"
            onClick={this.handlePurchase}
          >
            Submit Order
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchase: (userId, orderId) => dispatch(purchase(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
