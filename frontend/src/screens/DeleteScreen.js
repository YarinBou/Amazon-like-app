import React, { useEffect } from "react";
import DeleteProduct from "../components/DeleteProduct";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import SearchBox from "../components/SearchBox";

export default function DeleteScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <SearchBox
            placeholder="Search Product To Delete"
            handleChange={(e) => {
              const input = e.target.value.toLowerCase();
              let i = 0;
              for (i = 0; i < products.length; i++) {
                if (!products[i].name.toLowerCase().includes(input)) {
                  document.getElementById(products[i].name).style.display =
                    "none";
                } else {
                  document.getElementById(products[i].name).style.display = "";
                }
              }
            }}
          ></SearchBox>
        </div>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <DeleteProduct
              key={product._id}
              product={product}
              className={product.name}
            ></DeleteProduct>
          ))}
        </div>
      )}
    </div>
  );
}
