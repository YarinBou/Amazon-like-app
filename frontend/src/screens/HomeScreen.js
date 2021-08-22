import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import SearchBox from "../components/SearchBox";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <div>
        <img
          className="gfg"
          src="https://images.unsplash.com/photo-1590102426319-c7526718cd70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt="1"
        />
        <h3 className="first-txt">Sticker'sForGeeks</h3>
        <h3 className="second-txt">
          Design stickers you’ll want to stick everywhere
          <SearchBox
            placeholder="Search Your Sticker..."
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
        </h3>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              className={product.name}
            ></Product>
          ))}
        </div>
      )}
    </div>
  );
}
