import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {modItem} from '../store/singleItem'

class EditItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.item.name,
      description: props.item.description,
      stock: props.item.stock,
      price: props.item.price
    }
    this.handleChange = this.handleChange.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  validateField() {
    return this.state.name
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: this.props.item.name,
        description: this.props.item.description,
        stock: this.props.item.stock,
        price: this.props.item.price
      })
    }, 500)
  }

  handleChange(ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }

  onUpdate(evt) {
    evt.preventDefault()
    this.props.editItem(this.props.item.id, this.state)
  }

  render() {
    const {currUser} = this.props
    return (
      <div>
        <form className="ui form" onSubmit={this.onUpdate}>
          <h1> Admin Edit Item </h1>
          <br />
          {Object.keys(this.state).map(field => (
            <React.Fragment key={field}>
              <label>
                {field}:
                <input
                  type="text"
                  name={field}
                  value={this.state[field]}
                  onChange={this.handleChange}
                />
              </label>
              <br />
            </React.Fragment>
          ))}
          <button type="submit">edit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    editItem: (id, item) => dispatch(modItem(id, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)
