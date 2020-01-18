import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from './../store/cart'

import CheckoutCartSumm from './CheckoutCartSumm'
import CheckoutUserSumm from './CheckoutUserSumm'
import CheckoutForm from './CheckoutForm'

//ready to add?
//fetchCart: map state
//getUser: map state
//purchase shifts status to shipped

//CartCheckout & CartCheckoutCard components

//get/post users: FORM - firstName, lastName, email; if logged in, already in record
//get/post address: FORM - address; logged in vs guest
//get/how posted? orderItems: quantity, salePrice, itemId (orderId auto assigned)
//to orders: status = carted, userId
//need format, destination of CC info

//IF User info is in database, load user info component; else: load

class CheckoutWrap extends Component {
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
    const {cart, user} = this.props
    return (
      <div className="centered-parent">
        <div className="ui segment checkout-form" id="segment-checkout-form">
          <h3 id="checkout-header">Checkout</h3>
          {cart.length ? (
            <CheckoutCartSumm {...cart} />
          ) : (
            <div style={{textAlign: 'center'}}>Your Cart is empty!</div>
          )}

          {cart.length && !user.name === 'Guest' ? (
            <CheckoutUserSumm {...user} />
          ) : (
            <div />
          )}
          {cart.length ? <CheckoutForm {...user} /> : <div />}
        </div>
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

export default connect(mapStateToProps)(CheckoutWrap)
