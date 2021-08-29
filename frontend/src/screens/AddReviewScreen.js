import React, { useState } from "react";
import Axios from "axios";


function StarComponent(props){
    return (
        <i className={`fa ${props.value > props.rating ? 'fa-star-o' : 'fa-star'}`} 
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick} />
    )
}

export default class AddReviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.productId = props.match.params.id;
    this.state = {
      tempRating: 0,
      rating: 0,
      text: "",
    };
  }

  async submitHandler(e) {
    e.preventDefault();
    try {
      await Axios.post("/api/addReview", {
          rating: this.state.rating,
          text: this.state.text,
          productId: this.productId
        });
      document.location = `/product/${this.productId}`;
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
            <h1>Add Your Review</h1>
          </div>
          <div>{this.state.errorMessage}</div>
          <div style={{textAlign: 'left'}}>
            <span>
                {[1, 2, 3, 4, 5].map(i => <StarComponent 
                value={i} rating={this.state.tempRating}
                onMouseEnter={() => this.setState({tempRating: i})}
                onMouseLeave={() => this.setState({tempRating: this.state.rating})}
                onClick={() => this.setState({rating: i})}
                 />)}
            </span>
          </div>
          <div>
            <textarea
              placeholder="Enter Your Review"
              required
              onChange={(e) => this.setState({text: e.target.value})}
            />
          </div>
          <div>
            <button className="primary" type="submit">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    );
  }
}
