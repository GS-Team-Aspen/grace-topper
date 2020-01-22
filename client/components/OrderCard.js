import React from 'react'
import {Link} from 'react-router-dom'

const OrderCard = ({order}) => {
  return (
    <tr>
      <td>
        <Link to={`/orders/${order.id}`} className="order">
          {order.id}
        </Link>
      </td>
      <td>
        <Link to={`/orders/${order.id}`} className="order">
          {order.status}
        </Link>
      </td>
      <td>
        <Link to={`/orders/${order.id}`} className="order">
          {order.user.email}
        </Link>
      </td>
    </tr>
  )
}

export default OrderCard
