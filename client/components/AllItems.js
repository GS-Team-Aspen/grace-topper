import React, {useEffect, useState} from 'react'
import ItemCard from './ItemCard'
import {fetchItems} from '../store/item'
import {fetchCategories} from '../store/categories'
import {connect} from 'react-redux'
import Paginate from './Paginate'

const limits = [12, 24, 48, 96]

const AllItems = props => {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState(0)
  const [limit, setLimit] = useState(12)
  const [search, setSearch] = useState('')

  useEffect(
    () => {
      props.fetchItems(page, limit, category, search)
    },
    [page, limit, category, search]
  )

  return (
    <div>
      <div className="ui top attached menu">
        <div className="left menu">
          <select
            className="ui dropdown"
            onChange={evt => setCategory(evt.target.value)}
          >
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
        <div className="menu" id="search-bar">
          <div className="ui fluid category search item" id="search-bar">
            <input
              className="ui fluid input"
              onChange={evt => setSearch(evt.target.value)}
              value={search}
              placeholder="search items..."
            />
          </div>
        </div>
        <div className="right menu">
          {limits.map(limitOption => (
            <button
              key={limitOption}
              type="set-limit"
              className={`ui ${limitOption === limit ? 'disabled ' : ''}button`}
              onClick={() => setLimit(limitOption)}
            >
              {limitOption}
            </button>
          ))}
        </div>
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
  fetchItems
}

export default connect(mapState, mapDispatch)(AllItems)
