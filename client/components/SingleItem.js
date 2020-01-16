import React, {Component, Fragment} from 'react'
import {fetchSingleItem} from './../store/singleItem'
import {fetchItemReviews} from './../store/review'
//import {fetchCategory} from './../store/category'
import {connect} from 'react-redux'
import SingleItemDetails from './SingleItemDetails'
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
    //itemId.category ?
    return (
      <div className="centered-parent">
        <Fragment>
          <SingleItemDetails {...this.props.item} review={reviews} />

          <ReviewWrap {...reviews} />
        </Fragment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.singleItem,
    reviews: state.review
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleItem: id => dispatch(fetchSingleItem(id)),
    loadReviews: id => dispatch(fetchItemReviews(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
