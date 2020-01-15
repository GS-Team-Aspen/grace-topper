import React, {Component} from 'react'
import ItemCard from './ItemCard'
import {fetchItems} from './../store/item'
import {connect} from 'react-redux'

class AllItems extends Component {
  componentDidMount() {
    try {
      this.props.loadItems()
    } catch (err) {
      console.log(err)
    }
  }
  //needs onSubmit: add to cart to send as props
  render() {
    console.log(Array.isArray(this.props.items), 'in all items')
    return (
      <div className="centered-parent">
        <div className="custom-card-list ui cards">
          {this.props.items.length ? (
            this.props.items.map(item => {
              return (
                <div key={item.id}>
                  <ItemCard {...item} />
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
    items: state.items
  }
}

const mapDispatch = dispatch => {
  return {
    loadItems: () => dispatch(fetchItems())
  }
}

export default connect(mapStateToProps, mapDispatch)(AllItems)
