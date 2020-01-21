import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/user'

//**To do:
//Address of logged-in user needs to be accessed from state

//must get id of user from props, bc URL = /users/me
const initialState = {
  firstName: '',
  lastName: '',
  email: ''
  //   address: {
  //     street: '',
  //     city: '',
  //     state: '',
  //     zipCode: 0
  //   },
}

class UpdateUser extends Component {
  constructor() {
    super()
    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    !this.state.loaded && this.setState({...this.props.user, loaded: true})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
    console.log(this.state, 'state')
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
  }

  render() {
    const {user} = this.props

    return (
      <div>
        <div className="centered-parent">
          <div className="ui segment checkout-form" id="segment-checkout-form">
            <Fragment>
              <h4 className="ui dividing header">Current Information</h4>
              <div className="user-info">
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div>[NEED ADDRESS]</div>
                <div>{user.email}</div>
              </div>
            </Fragment>

            <h4 className="ui dividing header">
              Edit Information
              <i className="pen square icon" id="gray-edit-icon" />
            </h4>

            <form className="ui form" onSubmit={this.handleSubmit}>
              <Fragment>
                <Fragment>
                  <div className="field" id="name-wrapper">
                    <label>Name</label>
                    <div className="two fields">
                      <div className="eight wide field">
                        <input
                          className="user-input"
                          type="text"
                          name="firstName"
                          placeholder={`${user.firstName}`}
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="eight wide field">
                        <input
                          className="user-input"
                          type="text"
                          name="lastName"
                          placeholder={`${user.lastName}`}
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </Fragment>
                {/* <Fragment>
                  <div className="field" id="address-wrapper">
                    <label>Address</label>
                    <div className="two fields">
                      <div className="twelve wide field">
                        <input
                          className="user-input"
                          type="text"
                          name="address"
                          placeholder="USER STREET ADDRESS"
                          value={this.state.address.street}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="four wide field">
                        <input
                          className="user-input"
                          type="text"
                          name="city"
                          placeholder="USER CITY"
                          value={this.state.address.city}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="two fields">
                      <div className="two wide field">
                        <input
                          className="user-input"
                          type="text"
                          name="state"
                          placeholder="USER STATE"
                          value={this.state.address.state}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="four wide field">
                        <input
                          className="user-input"
                          type="number"
                          name="zip"
                          placeholder="USER ZIP"
                          value={this.state.address.zip}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </Fragment> */}
                <Fragment>
                  <div className="field" id="email-wrapper">
                    <label>Email Address</label>
                    <div className="sixteen wide field">
                      <div className="ten wide field">
                        <input
                          type="email"
                          name="email"
                          placeholder={`${user.email}`}
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </Fragment>
              </Fragment>

              <button
                className="ui right floated button"
                id="order-submit-button"
                type="submit"
              >
                Submit Update
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userId, user) => dispatch(updateUser(userId, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)
