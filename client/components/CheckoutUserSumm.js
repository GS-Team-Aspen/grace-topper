import React from 'react'
import {connect} from 'react-redux'

const CheckoutUserSumm = ({firstName, lastName, email}) => {
  return (
    <div id="segment-checkout-user">
      <h4 className="ui dividing header" id="checkout-user-divider">
        Customer Information
      </h4>
      <div className="user-info">
        <div>
          {firstName} {lastName}
        </div>
        <div>NEED ADDRESS</div>
        <div>{email}</div>

        <button
          type="submit"
          id="edit-user-details"
          className="ui label submit-button"

          //    links to Add/Update User page
        >
          <i className="pen square icon" />
          Edit
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CheckoutUserSumm)
