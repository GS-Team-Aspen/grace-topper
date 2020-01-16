import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import OrderCard from './OrderCard'

const Orders = props => {
  useEffect(() => {
    props.fetchOrders()
  }, [])

  return (
    <div>
      <div className="order">
        <h1>Order ID</h1>
        <h1>Order Status</h1>
        <h1>Email</h1>
      </div>
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
