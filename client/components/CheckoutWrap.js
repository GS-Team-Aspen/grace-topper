import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import CheckoutCartSumm from './CheckoutCartSumm'
import CheckoutUserSumm from './CheckoutUserSumm'
import CheckoutForm from './CheckoutForm'

//CheckoutWrap holds all components on checkout page
// Conditions:
// If cart is empty, renders "Your Cart is empty!" & no other components
// If something's in cart -
// If user is logged in, CheckoutUserSumm component displays (Customer Information section)
// More conditions in CheckoutForm component

const CheckoutWrap = props => {
  const {cart, user} = props
  return (
    <div className="centered-parent">
      <div className="ui segment checkout-form" id="segment-checkout-form">
        <h3 id="checkout-header">Checkout</h3>
        {cart.items ? (
          <Fragment>
            {cart.items.length ? (
              <CheckoutCartSumm {...cart} />
            ) : (
              <div style={{textAlign: 'center'}}>Your Cart is empty!</div>
            )}

            {cart.items.length && user.userType !== 'guest' ? (
              <CheckoutUserSumm {...user} />
            ) : (
              <div />
            )}

            {cart.items.length ? <CheckoutForm /> : <div />}
          </Fragment>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CheckoutWrap)
