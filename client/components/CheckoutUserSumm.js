import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const CheckoutUserSumm = ({firstName, lastName, email, id}) => {
  return (
    <div id="segment-checkout-user">
      <h4 className="ui dividing header" id="checkout-user-divider">
        Customer Information
      </h4>
      <div className="user-info">
        <div>
          {firstName} {lastName}
        </div>
        <div>[NEED ADDRESS]</div>
        <div>{email}</div>

        <button type="submit" className="ui label" id="edit-user-details">
          <Link to={`/users/${id}`}>
            Edit
            <i className="pen square icon icon-padding" />
          </Link>
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
