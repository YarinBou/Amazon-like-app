import React from "react";
import Axios from "axios";

export default class AddProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      image: "",
      price: 0,
      brand: "",
      countInStock: 0,
      description: "",
    };
  }

  async submitHandler(e) {
    e.preventDefault();
    try {
      await Axios.post("/api/add-product", {
        name: this.state.name,
        category: this.state.category,
        image: this.state.image,
        price: this.state.price,
        brand: this.state.brand,
        countInStock: this.state.countInStock,
        description: this.state.description,
        });
      document.location = "/";
    } catch (e) {
      console.log(e.response.data.validationError);
      this.setState({errorMessage: e.response.data.validationError});
    }
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={(e) => this.submitHandler(e)}>
          <div>
            <h1>Add New Product</h1>
          </div>
          <div>{this.state.errorMessage}</div>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              required
              onChange={(e) => this.setState({name: e.target.value})}
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter Category"
              required
              onChange={(e) => this.setState({category: e.target.value})}
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="url"
              placeholder="Enter Image URL"
              required
              onChange={(e) => this.setState({image: e.target.value})}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Price in $"
              required
              onChange={(e) => this.setState({price: e.target.value})}
            />
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              placeholder="Enter Brand"
              required
              onChange={(e) => this.setState({brand: e.target.value})}
            />
          </div>
          <div>
            <label>Count In Stock</label>
            <input
              type="text"
              placeholder="Enter Count In Stock"
              required
              onChange={(e) => this.setState({countInStock: e.target.value})}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              placeholder="Enter Description"
              required
              onChange={(e) => this.setState({description: e.target.value})}
            />
          </div>
          <div>
            <button className="primary" type="submit">
              Create Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}
