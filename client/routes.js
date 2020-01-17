import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart} from './components'
import {me} from './store'
import {fetchItems} from './store/item'

//new Grace Topper components:
import AllItems from './components/AllItems'
import SingleItem from './components/SingleItem'
import Orders from './components/Orders'
import SingleOrder from './components/SingleOrder'
import CheckoutForm from './components/CheckoutForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadItems()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={CheckoutForm} />
        <Route exact path="/items/:id" component={SingleItem} />
        <Route path="/orders/:orderId" component={SingleOrder} />
        <Route exact path="/orders" component={Orders} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/items" component={AllItems} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: state.user.userType !== 'guest',
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadItems: () => dispatch(fetchItems()),
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
