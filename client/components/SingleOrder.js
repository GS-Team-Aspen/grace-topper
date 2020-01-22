import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrder, modOrder} from '../store/singleOrder'
import ItemCard from './ItemCard'

class SingleOrder extends Component {
  constructor() {
    super()
    this.state = {
      status: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.orderId)
    this.setState({
      status: this.props.order.status
    })
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()

    this.props.editOrder(this.props.match.params.orderId, this.state)
  }

  orderTotal = () => {
    return this.props.order.items
      .reduce(
        (acc, item) => acc + item.orderItem.salePrice * item.orderItem.quantity,
        0
      )
      .toLocaleString(undefined, {style: 'currency', currency: 'USD'})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.user.userType === 'admin' ? (
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field sixteen wide">
              <div className="field four wide">
                <select
                  className="ui fluid search dropdown"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <option value={this.props.order.status}>
                    {' '}
                    Admin Change Status Here
                  </option>
                  <option value="delivered">delivered</option>
                  <option value="shipped">shipped</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
            </div>
            <button
              className="ui right floated button"
              id="order-submit-button"
              type="submit"
            >
              Edit Status
            </button>
          </form>
        ) : (
          <div />
        )}
        {this.props.order.items ? (
          <div>
            <h3> Order Date: {this.props.order.createdAt.slice(0, 9)}</h3>
            <h3> Order Status: {this.props.order.status}</h3>

            {this.props.order.items.map(item => (
              <ItemCard {...item} type="order" key={item.id} />
            ))}

            <h2>Total: {this.orderTotal()}</h2>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  order: state.singleOrder,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    getSingleOrder: id => dispatch(fetchOrder(id)),
    editOrder: (id, status) => dispatch(modOrder(id, status))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
