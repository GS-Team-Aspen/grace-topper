import React, {Component} from 'react'

class SingleItem extends Component {
  //componentDidMount to access item matching route id, from global state
  render() {
    const fakeItem = {
      id: 1,
      name: 'Urban Sombrero',
      price: 275.0,
      stock: 17,
      description:
        'Handmade in Mexico by one of my favorite mom-and-pop hatmakers. Top-quality natural felt with grosgrain hatband and feather.',
      imageUrl: 'urbanSombrero.jpg'
    }

    return (
      <div className="centered-parent">
        <div className="single-item">
          <div className="item-image">
            <img src={fakeItem.imageUrl} />
          </div>
          <div className="item-details">
            <div className="target-name">{fakeItem.name}</div>
            <div className="item-desc">{fakeItem.description}</div>
            <div className="item-review-stars">[Reviews Component]</div>
            <div className="item-price">{`$ ${fakeItem.price}`}</div>
            <button
              type="submit"
              className="ui label submit-button"
              //   onClick={() => ADD TO CART (id)}
            >
              <i className="plus square icon" />
              Add to Cart
            </button>
            {/* divider, list of reviews below details? */}
          </div>
        </div>
      </div>
    )
  }
}

export default SingleItem
