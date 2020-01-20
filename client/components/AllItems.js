import React, {useEffect, useState} from 'react'
import ItemCard from './ItemCard'
import {fetchItems} from './../store/item'
import {fetchCategories} from '../store/categories'
import {connect} from 'react-redux'

const AllItems = props => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    props.fetchItems(page, limit)
    props.fetchCategories()
  }, [])

  return (
    <div>
      <div>
        <select className="ui dropdown">
          <option value="0">Display All</option>
          {props.categories.length
            ? props.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            : ''}
        </select>
      </div>

      <div className="centered-parent">
        <div className="custom-card-list ui cards">
          {props.items.length ? (
            props.items.map(item => {
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

const mapState = state => ({
  items: state.items,
  categories: state.categories
})

const mapDispatch = {
  fetchItems,
  fetchCategories
}

export default connect(mapState, mapDispatch)(AllItems)
