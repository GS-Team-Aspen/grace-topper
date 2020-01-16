import React, {Component} from 'react'
import {fetchSingleItem} from './../store/singleItem'
import {connect} from 'react-redux'
import ReviewWrap from './ReviewWrap'

class SingleItem extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.loadSingleItem(id)
  }

  render() {
    //**can't access Categories down to name
    const {name, description, id} = this.props.item
    return (
      <React.Fragment>
        <div className="centered-parent">
          <div className="single-item">
            <div className="item-image">
              <img src={this.props.item.imageUrl} />
            </div>
            <div className="item-details">
              <div className="target-name">{name}</div>
              <div className="item-desc">{description}</div>
              <div className="desc-label">
                <div className="ui mini basic label">Sombrero</div>
              </div>
              <div className="item-review-stars">
                [Reviews Component: Stars & # reviews]
              </div>

              <button
                type="submit"
                className="ui label submit-button"
                //   onClick={() => ADD TO CART (id)}
              >
                <i className="plus square icon" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="ui divider" />
        <ReviewWrap itemId={id} />
      </React.Fragment>
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
