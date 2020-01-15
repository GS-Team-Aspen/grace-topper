import React from 'react'
import {connect} from 'react-redux'

const fakeCart = [
  {
    imageUrl: 'google.com',
    name: '1',
    price: '11',
    stock: '1200',
    description: 'This is number 1'
  },
  {
    imageUrl: 'google.com',
    name: '2',
    price: '12',
    stock: '1200',
    description: 'This is number 2'
  }
]

const Cart = () => (
  <div>
    {fakeCart.map(item => (
      <div>
        <img src={item.imageUrl} />
        <div>
          {item.name} ${item.price}
        </div>
        <div>Stock: {item.stock}</div>
        <div>{item.description}</div>
      </div>
    ))}
  </div>
)

const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Cart)
