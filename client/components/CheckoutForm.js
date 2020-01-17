import React, {Component} from 'react'
import {connect} from 'react-redux'

//ready to go?
//fetchCart
//getUser
//purchase

//CartCheckout & CartCheckoutCard components

//get/post users: FORM - firstName, lastName, email
//get/post address: FORM - address
//get/how posted? orderItems: quantity, salePrice, itemId (orderId auto assigned)
//to orders: status = carted, userId
//need format, destination of CC info

//IF User info is in database, load user info component; else: load

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
        <div className="ui segment checkout-form" id="segment-checkout-form">
          <h3 id="checkout-header">Checkout</h3>

          <table className="ui table">
            <thead>
              <tr>
                <th className="seven wide">Item</th>
                <th className="three wide center aligned">Unit Price</th>
                <th className="one wide center aligned" />
                <th className="two wide center aligned">Qty</th>
                <th className="three wide center aligned">Item Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Urban Sombrero</td>
                <td className="center aligned">$75</td>
                <td className="center aligned">x</td>
                <td className="center aligned">2</td>
                <td className="center aligned">$150</td>
              </tr>
              <tr>
                <td>Brown Derby</td>
                <td className="center aligned">$25</td>
                <td className="center aligned">x</td>
                <td className="center aligned">3</td>
                <td className="center aligned">$75</td>
              </tr>
              <tr>
                <td>Top Hat</td>
                <td className="center aligned">$100</td>
                <td className="center aligned">x</td>
                <td className="center aligned">4</td>
                <td className="center aligned">$400</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Total Cost</th>
                <th className="center aligned" />
                <th className="center aligned" />
                <th className="center aligned" />
                <th className="center aligned">$625</th>
              </tr>
            </tfoot>
          </table>

          <div id="segment-checkout-user">
            <h4 className="ui dividing header" id="checkout-user-divider">
              Customer Information
            </h4>
            <div className="user-info">
              <div>Kristen Andersen</div>
              <div>523 S. Plymouth Ct., Chicago, IL 60605</div>
              <div>kristen.andersen@gmail.com</div>
            </div>
          </div>

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
            <div className="ui divider" />

            <button
              className="ui right floated button"
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
