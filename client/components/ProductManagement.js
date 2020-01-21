import React from 'react'
import {connect} from 'react-redux'
import {makeItem} from '../store/item'
import {setCategory, deleteCategory} from '../store/categories'

class ProductManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryName: '',
      itemName: '',
      itemPrice: '',
      itemStock: '',
      itemDescription: '',
      itemImageUrl: '',
      itemCategory: '',
      itemCategories: []
    }
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.addCategoryToItem = this.addCategoryToItem.bind(this)
    this.removeCategoryFromItem = this.removeCategoryFromItem.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleAddCategory() {
    this.props.setCategory(this.state.categoryName)
    this.setState({categoryName: ''})
  }

  handleAddItem(event) {
    event.preventDefault()
    const item = {
      name: this.state.itemName,
      price: parseInt(this.state.itemPrice, 10),
      stock: parseInt(this.state.itemStock, 10),
      description: this.state.itemDescription,
      imageUrl: this.state.itemImageUrl,
      categories: this.state.itemCategories
    }
    if (item.imageUrl === '') delete item.imageUrl
    this.props.addItem(item)
    this.setState({
      itemName: '',
      itemPrice: '',
      itemStock: '',
      itemDescription: '',
      itemImageUrl: '',
      itemCategory: '',
      itemCategories: []
    })
  }

  addCategoryToItem(category) {
    const categories = this.state.itemCategories
    this.setState({itemCategories: [...categories, category]})
  }

  removeCategoryFromItem(cat) {
    const categories = this.state.itemCategories
    this.setState({
      itemCategories: categories.filter(category => category !== cat)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Product Management</h1>
        <h3>Create Category:</h3>
        <input
          name="categoryName"
          type="text"
          onChange={this.handleChange}
          value={this.state.categoryName}
        />
        <div onClick={this.handleAddCategory}>Add Category</div>
        <h3>Categories</h3>
        {this.props.categories.map(category => (
          <div key={category.id} className="category-holder">
            <div>{category.name}</div>
            <button
              type="remove-category-button"
              className="ui tiny button"
              onClick={() => this.props.deleteCategory(category.id)}
            >
              Delete Category
            </button>
          </div>
        ))}
        <h3>Create Item</h3>
        <form onSubmit={this.handleAddItem}>
          <label>Name:</label>
          <input
            name="itemName"
            type="text"
            onChange={this.handleChange}
            value={this.state.itemName}
            required
          />
          <label>Description:</label>
          <input
            name="itemDescription"
            type="text"
            onChange={this.handleChange}
            value={this.state.itemDescription}
            required
          />
          <label>Price:</label>
          <input
            name="itemPrice"
            type="text"
            onChange={this.handleChange}
            value={this.state.itemPrice}
            required
          />
          <label>Stock:</label>
          <input
            name="itemStock"
            type="text"
            onChange={this.handleChange}
            value={this.state.itemStock}
            required
          />
          <label>Image URL:</label>
          <input
            name="itemImageUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.itemImageUrl}
          />
          <div>
            Item Categories:
            {this.state.itemCategories.map(category => (
              <div
                key={category.id}
                onClick={() => this.removeCategoryFromItem(category)}
              >
                {category.name}
              </div>
            ))}
          </div>
          <label>Add Category to Item:</label>
          <input
            name="itemCategory"
            type="text"
            onChange={this.handleChange}
            value={this.state.itemCategory}
          />
          {this.props.categories.map(category => {
            if (
              category.name
                .toLowerCase()
                .startsWith(this.state.itemCategory.toLowerCase()) &&
              !this.state.itemCategories.includes(category)
            )
              return (
                <div
                  className="ui mini button"
                  key={category.id}
                  onClick={() => this.addCategoryToItem(category)}
                >
                  {category.name}
                </div>
              )
          })}
          <input type="submit" value="Add Item" />
        </form>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  categories: state.categories
})

const mapDispatch = dispatch => ({
  setCategory: categoryName => dispatch(setCategory(categoryName)),
  deleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
  addItem: item => dispatch(makeItem(item))
})

export default connect(mapState, mapDispatch)(ProductManagement)
