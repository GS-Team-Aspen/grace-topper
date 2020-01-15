import React, {Component} from 'react'
import {fetchSingleItem} from './../store/singleItem'
import {connect} from 'react-redux'

//params.id OK

class SingleItem extends Component {
  componentDidMount() {
    //const id = 1
    const id = Number(this.props.match.params.id)
    //console.log('MATCH', typeof id)
    this.props.loadSingleItem(id)
  }

  render() {
    //const {item} = this.props
    return (
      <div className="centered-parent">
        <div className="single-item">
          <div className="item-image">
            <img src={this.props.item.imageUrl} />
          </div>
          <div className="item-details">
            <div className="target-name">{this.props.item.name}</div>
            <div className="item-desc">{this.props.item.description}</div>
            <div className="item-review-stars">[Reviews Component]</div>
            <div className="item-price">{`$ ${this.props.item.price}`}</div>
            <button
              type="submit"
              className="ui label submit-button"
              //   onClick={() => ADD TO CART (id)}
            >
              <i className="plus square icon" />
              Add to Cart
            </button>
            {/* divider, list of reviews below details? */}
          </div>
        </div>
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
