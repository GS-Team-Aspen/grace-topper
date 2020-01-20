import React from 'react'
import CheckoutCartSummCard from './CheckoutCartSummCard'

const CheckoutCartSumm = ({items}) => {
  const orderTotal = itemsArr => {
    let result = 0
    itemsArr.forEach(item => {
      result += item.price * item.orderItem.quantity
    })
    return result
  }

  return (
    <div>
      <table className="ui table">
        <thead>
          <tr>
            <th className="five wide">Item</th>
            <th className="three wide right aligned">Unit Price</th>
            <th className="two wide right aligned" />
            <th className="three wide right aligned">Qty</th>
            <th className="three wide right aligned">Item Cost</th>
          </tr>
        </thead>
        <tbody>
          {items[0].orderItem ? (
            items.map(item => {
              const itemTotal = item.price * item.orderItem.quantity
              return (
                <tr key={item.id}>
                  <CheckoutCartSummCard {...item} totalItem={itemTotal} />
                </tr>
              )
            })
          ) : (
            <div />
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>Total Cost</th>
            <th className="right aligned" />
            <th className="right aligned" />
            <th className="right aligned" />
            <th className="right aligned">
              {orderTotal(items).toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD'
              })}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default CheckoutCartSumm
