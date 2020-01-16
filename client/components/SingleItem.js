import React, {Component, Fragment} from 'react'
import {fetchSingleItem} from './../store/singleItem'
import {connect} from 'react-redux'
import SingleItemDetails from './SingleItemDetails'
import ReviewWrap from './ReviewWrap'

class SingleItem extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.loadSingleItem(id)
  }

  render() {
    //**can't access Categories down to name
    const itemId = this.props.item
    return (
      <div className="centered-parent">
        <Fragment>
          <SingleItemDetails {...this.props.item} />

          <ReviewWrap itemId={itemId} />
        </Fragment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.singleItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleItem: id => dispatch(fetchSingleItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
