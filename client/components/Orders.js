import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'

const Orders = props => {
  useEffect(() => {
    props.fetchOrders()
  }, [])

  return (
    <div>
      {props.orders.length ? (
        props.orders.map(order => <h1 key={order.id}>{order.status}</h1>)
      ) : (
        <h2>There are no orders</h2>
      )}
    </div>
  )
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = {
  fetchOrders
}

export default connect(mapState, mapDispatch)(Orders)
