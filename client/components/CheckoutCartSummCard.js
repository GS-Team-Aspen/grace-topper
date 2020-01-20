import React, {Fragment} from 'react'

const CheckoutCartSummCard = ({name, price, orderItem, totalItem}) => {
  const numberWithCommas = num => {
    return num.toLocaleString()
  }
  return (
    <Fragment>
      <td>{name}</td>
      <td className="right aligned">
        {price.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD'
        })}
      </td>
      <td className="right aligned">x</td>
      <td className="right aligned">{numberWithCommas(orderItem.quantity)}</td>
      <td className="right aligned">
        {totalItem.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD'
        })}
      </td>
    </Fragment>
  )
}

export default CheckoutCartSummCard
