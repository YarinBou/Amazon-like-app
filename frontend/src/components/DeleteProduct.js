import React, {  useState } from "react";
import Axios from "axios";

export default function Product(props) {
  const { product } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const deleteProductHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      await Axios.delete(`/product/${product._id}`);
      window.location.reload();
    } catch (e) {
      console.log(e.response.data.validationError);
      setErrorMessage(e.response.data.validationError);
    }
  };
    return (
    <div key={product._id} id={product.name} style={{width: '48%', textAlign: 'center', border: '1px solid gray', boxSizing: 'border-box', margin: '1%', padding: '1em'}}>
      <div style={{textAlign: 'center'}}>
          <img className="medium" src={product.image} alt={product.name} />
          <h2 className="productName">{product.name}</h2>
      </div>
      <div>
        <button onClick={deleteProductHandler}>Delete</button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
}
