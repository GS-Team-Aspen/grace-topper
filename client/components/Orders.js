import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import OrderCard from './OrderCard'
import Paginate from './Paginate'

const Orders = props => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect(
    () => {
      props.fetchOrders(props.user, page, limit)
    },
    [page]
  )

  return (
    <div>
      <div>
        {props.orders ? (
          props.orders.map(order => <OrderCard order={order} key={order.id} />)
        ) : (
          <h2>No orders</h2>
        )}
      </div>
      {props.count ? (
        <Paginate
          limit={limit}
          count={props.count}
          setPage={newPage => setPage(newPage)}
        />
      ) : (
        ''
      )}
    </div>
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
