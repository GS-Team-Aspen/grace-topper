import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'
import ItemCard from './ItemCard'

const SingleOrder = props => {
  useEffect(() => {
    props.fetchOrder()
  }, [])

  const orderTotal = () => {
    return props.order.items
      .reduce(
        (acc, item) => acc + item.orderItem.salePrice * item.orderItem.quantity,
        0
      )
      .toLocaleString(undefined, {style: 'currency', currency: 'USD'})
  }

  return (
    <div>
      <div>
        {props.order.items ? (
          <div>
            {props.order.items.map(item => (
              <ItemCard {...item} type="order" key={item.id} />
            ))}

            <h2>Total: {orderTotal()}</h2>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  )
}

const mapState = state => ({
  order: state.singleOrder,
  user: state.user
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchOrder: () => dispatch(fetchOrder(ownProps.match.params.orderId))
})

export default connect(mapState, mapDispatch)(SingleOrder)
