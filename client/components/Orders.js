import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import OrderCard from './OrderCard'
import Paginate from './Paginate'

const Orders = props => {
  const [page, setPage] = useState(1)
  //const [limit, setLimit] = useState(10)
  const [limit] = useState(10)

  useEffect(
    () => {
      props.fetchOrders(props.user, page, limit)
    },
    [page]
  )
  if (!props.orders) return <h2>No orders</h2>
  return (
    <React.Fragment>
      <table className="ui celled striped table">
        <thead>
          <tr>
            <th colSpan="3">All Orders</th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {props.orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </tbody>
      </table>
      {props.count ? (
        <Paginate
          limit={limit}
          count={props.count}
          setPage={newPage => setPage(newPage)}
        />
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

const mapState = state => ({
  orders: state.orders.data,
  count: state.orders.count,
  user: state.user
})

const mapDispatch = {
  fetchOrders
}

export default connect(mapState, mapDispatch)(Orders)
