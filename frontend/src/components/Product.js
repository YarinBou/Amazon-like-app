import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card" id={product.name}>
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 className="productName">{product.name}</h2>
        </Link>
        <Rating 
          rating={product.reviews.length === 0 ? 0 : product.reviews.map(r => r.rating).reduce((a, b) => a+b, 0) / product.reviews.length}
          numReviews={product.reviews.length} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}
