import React, {Fragment} from 'react'

const CheckoutCartSummCard = ({name, price, orderItem, totalItem}) => {
  const numberWithCommas = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <Fragment>
      <td>{name}</td>
      <td className="right aligned">{`$${numberWithCommas(price)}`}</td>
      <td className="right aligned">x</td>
      <td className="right aligned">{numberWithCommas(orderItem.quantity)}</td>
      <td className="right aligned">{`$${numberWithCommas(totalItem)}`}</td>
    </Fragment>
  )
}

export default CheckoutCartSummCard
