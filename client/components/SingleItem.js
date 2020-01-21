import React from 'react'
import {removeItem} from '../store/item'
import {addToCart} from '../store/cart'
import {connect} from 'react-redux'
import {SingleItemDetails} from './SingleItemDetails'
import ReviewWrap from './ReviewWrap'

const SingleItem = ({
  items,
  match,
  currUser,
  addCart,
  deleteItem,
  history,
  orderId
}) => {
  const item = items
    ? items.find(item => item.id === Number(match.params.id))
    : null
  if (!item) return <div>Loading...</div>
  return (
    <div className="centered-parent">
      <SingleItemDetails
        {...item}
        currUser={currUser}
        add={quantity => addCart(item.id, orderId, quantity)}
        remove={() => deleteItem(item.id, history)}
      />

      <ReviewWrap itemId={item.id} reviews={item.reviews} currUser={currUser} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.items,
    reviews: state.reviews,
    orderId: state.cart.id,
    currUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleItem: item => dispatch(fetchSingleItem(item)),
    addCart: (itemId, orderId, quantity) =>
      dispatch(addToCart(itemId, orderId, quantity)),
    deleteItem: (itemId, history) => dispatch(removeItem(itemId, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
