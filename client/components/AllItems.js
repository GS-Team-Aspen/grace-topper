import React, {useEffect, useState} from 'react'
import ItemCard from './ItemCard'
import {fetchItems} from '../store/item'
import {fetchCategories} from '../store/categories'
import {connect} from 'react-redux'
import Paginate from './Paginate'

const AllItems = props => {
  const [page, setPage] = useState(1)
  //const [limit, setLimit] = useState(10)
  const [limit] = useState(10)
  useEffect(
    () => {
      props.fetchItems(page, limit)
    },
    [page]
  )

  useEffect(() => {
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
          {props.items ? (
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

      {props.count ? (
        <Paginate
          limit={limit}
          count={props.count}
          setPage={newPage => setPage(newPage)}
        />
      ) : (
        ''
      )}
    </div>
  )
}

const mapState = state => ({
  items: state.items.data,
  count: state.items.count,
  categories: state.categories
})

const mapDispatch = {
  fetchItems,
  fetchCategories
}

export default connect(mapState, mapDispatch)(AllItems)
