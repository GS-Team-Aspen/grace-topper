import React from 'react'

const CheckoutUserSumm = props => {
  const {firstName, lastName, email} = props
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

export default CheckoutUserSumm
