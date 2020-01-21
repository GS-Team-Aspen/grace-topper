import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {modItem} from '../store/item'

class EditItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }
  handleChange(ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }
  onUpdate(evt) {
    evt.preventDefault()
    this.props.editItem(this.props.currItem.id, this.state)
    this.setState({
      quantity: '',
      price: ''
    })
  }

  render() {
    const {currUser} = this.props
    //set up conditional to only display if user is admin

    return (
      <div>
        {currUser.userType === 'admin' ? (
          <form className="ui form" onSubmit={this.onUpdate}>
            <h1> Admin Edit Item </h1>
            <br />
            <label>
              Quantity:
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                placeholder={`${this.props.currItem.stock}`}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder={`${this.props.currItem.price}`}
              />
            </label>
            <br />
            <button type="submit">edit</button>
          </form>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.user,
    currItem: state.singleItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editItem: (id, item) => dispatch(modItem(id, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)
