import React from 'react'
import {Link} from 'react-router-dom'

const OrderCard = ({order}) => {
  return (
    <div>
      <Link to={`/orders/${order.id}`} className="order">
        <h1>{order.id}</h1>
        <h1>{order.status}</h1>
        {order.user ? <h1>{order.user.email}</h1> : <h1> 'unregistered'</h1>}
      </Link>
    </div>
  )
}

export default OrderCard
