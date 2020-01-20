import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import OrderCard from './OrderCard'

const Orders = props => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    props.fetchOrders(props.user, page, limit)
  }, [])

  return (
    <div>
      {props.orders.length ? (
        props.orders.map(order => <OrderCard order={order} key={order.id} />)
      ) : (
        <h2>No orders</h2>
      )}
    </div>
  )
}

const mapState = state => ({
  orders: state.orders,
  user: state.user
})

const mapDispatch = {
  fetchOrders
}

export default connect(mapState, mapDispatch)(Orders)
