import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import cart from './cart'
import user from './user'
import orders from './orders'
import singleOrder from './singleOrder'
import {itemsReducer as items} from './item'
import {singleItemReducer as singleItem} from './singleItem'
import {reviewsReducer as review} from './review'
import categories from './categories'

const reducer = combineReducers({
  user,
  items,
  singleItem,
  review,
  orders,
  singleOrder,
  cart,
  categories
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
