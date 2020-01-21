import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {purchase} from './../store/cart'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const userId = this.props.user.id
    const orderId = this.props.cart.id
    console.log('USERID!', userId, 'ORDERID!', orderId)
    this.props.placeOrder(userId, orderId)
    this.setState({
      firstName: '',
      lastName: '',
      address: {street: '', city: '', state: '', zipCode: 0},
      email: ''
    })
  }

  render() {
    const {user} = this.props
    console.log('CHECKOUT FORM', this.props)

    toast.configure()

    const handleToken = async (token, addresses) => {
      console.log({token, addresses})
      const response = await axios.post('/api/orders/checkout', {
        token
        // product
      })
      const {status} = response.data
      if (status === 'success') {
        toast('Success! Check email for details.', {type: 'success'})
      } else {
        toast('Someting went wrong.', {type: 'error'})
      }
    }

    // dummy bc can't access cart
    const amount = 42
    const name = 'Urban Sombrero'

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
            <StripeCheckout
              stripeKey="pk_test_LRFcEN1LwrCMSWoV74R5OAzr00ms1mgNSq"
              token={handleToken}
              // shippingAddress="123 Fake St."
              amount={{amount} * 100}
              name={name}
            />
          </div>
          <button
            className="ui right floated button"
            id="order-submit-button"
            type="submit"
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
    placeOrder: (userId, orderId) => dispatch(purchase(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
