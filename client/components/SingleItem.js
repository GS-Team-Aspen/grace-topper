import React from 'react'
import {removeItem} from '../store/item'
import {addToCart} from '../store/cart'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'
import {SingleItemDetails} from './SingleItemDetails'
import ReviewWrap from './ReviewWrap'

const SingleItem = ({
  item,
  match,
  currUser,
  addCart,
  deleteItem,
  history,
  orderId,
  fetchItem
}) => {
  React.useEffect(() => {
    const fetchData = async () => {
      await fetchItem(match.params.id)
    }
    fetchData()
  }, [])

  if (!item.name) return <div>Loading...</div>
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
    item: state.singleItem,
    orderId: state.cart.id,
    currUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleItem: item => dispatch(fetchSingleItem(item)),
    addCart: (itemId, orderId, quantity) =>
      dispatch(addToCart(itemId, orderId, quantity)),
    deleteItem: (itemId, history) => dispatch(removeItem(itemId, history)),
    fetchItem: itemId => dispatch(fetchSingleItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
