import React, {Component} from 'react'
import ItemCard from './ItemCard'

class AllItems extends Component {
  //componentDidMount to access all items from global state
  //needs onSubmit: add to cart to send as props
  render() {
    const fakeItems = [
      {
        id: 1,
        name: 'Urban Sombrero',
        price: 275.0,
        stock: 17,
        description:
          'Handmade in Mexico by one of my favorite mom-and-pop hatmakers. Top-quality natural felt with grosgrain hatband and feather.',
        imageUrl: 'urbanSombrero.jpg'
      },
      {
        id: 2,
        name: 'Sorting Hat',
        price: 125.0,
        stock: 22,
        description:
          'I shall place the Sorting Hat on your head, and you will be sorted into your houses.',
        imageUrl: 'sortingHat.png'
      }
    ]
    return (
      <div className="centered-parent">
        <div className="custom-card-list ui cards">
          {fakeItems.map(item => {
            return (
              <div key={item.id}>
                <ItemCard {...item} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AllItems
