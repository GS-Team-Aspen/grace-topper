import React, {Component} from 'react'
import ItemCard from './ItemCard'
import {fetchItems} from './../store/item'
import {fetchCategories} from '../store/categories'
import {connect} from 'react-redux'

class AllItems extends Component {
  componentDidMount() {
    this.props.loadItems()
    this.props.loadCategories()
  }

  //needs onSubmit: add to cart to send as props
  render() {
    return (
      <div>
        <div>
          <select className="ui dropdown">
            <option value="0">Display All</option>
            {this.props.categories.length
              ? this.props.categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              : ''}
          </select>
        </div>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    loadItems: () => dispatch(fetchItems()),
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatch)(AllItems)
