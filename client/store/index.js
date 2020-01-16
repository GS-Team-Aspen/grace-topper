import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {itemsReducer as items} from './item'
import {singleItemReducer as singleItem} from './singleItem'
import {categoryReducer as category} from './category'

const reducer = combineReducers({
  user,
  items,
  singleItem,
  category
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
