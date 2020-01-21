import React, {useEffect, Component} from 'react'
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

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()

    this.props.modOrder(this.props.order.id, this.state.status)
    this.setState({
      status: ''
    })
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
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field sixteen wide">
            <div className="field four wide">
              <select
                className="ui fluid search dropdown"
                name="status"
                value=""
                onChange={this.handleChange}
              >
                <option value="status" />
                <option value="shipped">shipped</option>
                <option value="cancelled">cancelled</option>
                <option value="delivered">delivered</option>
              </select>
            </div>
          </div>
        </form>
        <div>
          {this.props.order.items ? (
            <div>
              {this.props.order.items.map(item => (
                <ItemCard {...item} type="order" key={item.id} />
              ))}

              <h2>Total: {this.orderTotal()}</h2>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.singleOrder,
  user: state.user
})

const mapDispatch = dispatch => ({
  getOrder: orderId => dispatch(fetchOrder(orderId)),
  modOrder: (orderId, status) => dispatch(modOrder(orderId, status))
})

export default connect(mapState, mapDispatch)(SingleOrder)
