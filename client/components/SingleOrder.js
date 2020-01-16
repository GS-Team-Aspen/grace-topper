import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'
import ItemCard from './ItemCard'

const SingleOrder = props => {
  useEffect(() => {
    props.fetchOrder()
  }, [])

  return (
    <div>
      {props.order.items ? (
        props.order.items.map(item => (
          <ItemCard {...item} type="order" key={item.id} />
          // <div key={item.id}>
          //   <h2>{item.name}</h2>
          //   <h2>{item.orderItem.salePrice}</h2>
          //   <h2>{item.orderItem.quantity}</h2>
          // </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
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
