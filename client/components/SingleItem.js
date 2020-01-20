import React, {Component, Fragment} from 'react'
import {fetchSingleItem} from '../store/singleItem'
import {removeItem} from '../store/item'
import {fetchItemReviews} from '../store/review'
import {addToCart} from '../store/cart'
//import {fetchCategory} from './../store/category'
import {connect} from 'react-redux'
import {SingleItemDetails} from './SingleItemDetails'
import ReviewWrap from './ReviewWrap'

class SingleItem extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.loadSingleItem(id)
    this.props.loadReviews(id)
  }

  render() {
    //**can't access Categories down to name
    const reviews = this.props.reviews
    return (
      <div className="centered-parent">
        <SingleItemDetails
          {...this.props.item}
          currUser={this.props.currUser}
          review={reviews}
          add={quantity =>
            this.props.addCart(this.props.item.id, this.props.orderId, quantity)
          }
          remove={() =>
            this.props.deleteItem(this.props.item.id, this.props.history)
          }
        />

        <ReviewWrap {...reviews} currUser={this.props.currUser} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.singleItem,
    reviews: state.reviews,
    orderId: state.cart.id,
    currUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleItem: id => dispatch(fetchSingleItem(id)),
    loadReviews: id => dispatch(fetchItemReviews(id)),
    addCart: (itemId, orderId, quantity) =>
      dispatch(addToCart(itemId, orderId, quantity)),
    deleteItem: (itemId, history) => dispatch(removeItem(itemId, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
