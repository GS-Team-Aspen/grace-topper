import React, {Component} from 'react'
import ItemCard from './ItemCard'
import {fetchItems} from './../store/item'
import {connect} from 'react-redux'

class AllItems extends Component {
  componentDidMount() {
    this.props.loadItems()
  }

  //needs onSubmit: add to cart to send as props
  render() {
    return (
      <div className="centered-parent">
        <div className="custom-card-list ui cards">
          {this.props.items.length ? (
            this.props.items.map(item => {
              return (
                <div key={item.id}>
                  <ItemCard {...item} user={this.props.user} />
                </div>
              )
            })
          ) : (
            <div> No Items</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadItems: () => dispatch(fetchItems())
  }
}

export default connect(mapStateToProps, mapDispatch)(AllItems)
