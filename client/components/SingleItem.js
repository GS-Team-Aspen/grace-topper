import React, {Component, Fragment} from 'react'
import {fetchSingleItem} from './../store/singleItem'
import {fetchItemReviews} from './../store/review'
import {addToCart} from './../store/cart'
//import {fetchCategory} from './../store/category'
import {connect} from 'react-redux'
import {SingleItemDetails} from './SingleItemDetails'
import ReviewWrap from './ReviewWrap'
import EditItem from './EditItem'

class SingleItem extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.loadSingleItem(id)
    this.props.loadReviews(id)
  }

  render() {
    //**can't access Categories down to name
    const reviews = this.props.reviews
    //itemId.category ?
    return (
      <div className="centered-parent">
        <Fragment>
          <SingleItemDetails
            {...this.props.item}
            currUser={this.props.currUser}
            review={reviews}
            add={quantity =>
              this.props.addCart(
                this.props.item.id,
                this.props.orderId,
                quantity
              )
            }
          />

          <ReviewWrap {...reviews} currUser={this.props.currUser} />
          <EditItem />
        </Fragment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.singleItem,
    reviews: state.review,
    orderId: state.cart.id,
    currUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleItem: id => dispatch(fetchSingleItem(id)),
    loadReviews: id => dispatch(fetchItemReviews(id)),
    addCart: (itemId, orderId, quantity) =>
      dispatch(addToCart(itemId, orderId, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
