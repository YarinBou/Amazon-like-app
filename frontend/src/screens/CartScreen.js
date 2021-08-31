import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import { listProducts } from "../actions/productActions";
import { useHistory } from "react-router-dom";

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const history = useHistory();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const [cartItems, setCartItems] = useState([]);
  const refreshUserCart = async () => {
    try {
      const result = await Axios.get("/api/getUserCart");
      const { userCartItems } = result.data;

      setCartItems(
        Object.entries(userCartItems).map(([productId, qty]) => {
          let product = {};
          for (const iter of products) {
            if (iter._id === productId) {
              product = iter;
              break;
            }
          }
          return {
            product: productId,
            image: product.image,
            name: product.name,
            qty: qty,
            countInStock: product.countInStock,
            price: product.price,
          };
        })
      );
    } catch (e) {
      console.log(e.response.data.validationError);
      setCartItems([]);
    }
  };

  const addToCartHandler = async (productId, qty) => {
    if (productId) {
      try {
        await Axios.post("/api/addItemToCart", {
          productId: productId,
          qty: qty,
        });
      } catch (e) {
        if (e.response.data.validationError === 'Incorrect password') {
          props.history.push("/login");
          return;
        }
        console.log(e.response.data.validationError);
        setCartItems(null);
      }
    }
    await refreshUserCart();
  };

  const removeFromCartHandler = async (productId) => {
    if (productId) {
      try {
        await Axios.post("/api/removeItemFromCart", { productId: productId });
      } catch (e) {
        if (e.response.data.validationError === 'Incorrect password') {
          props.history.push("/login");
          return;
        }
        console.log(e.response.data.validationError);
        setCartItems(null);
      }
    }
    await refreshUserCart();
  };

  const checkoutHandler = () => {
    props.history.push("/shipping");
  };

  useEffect(async () => {
    if ((products || []).length > 0) {
      const productId = props.match.params.id;
      const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;
      if (productId && qty) {
        history.replace("/cart");
        await addToCartHandler(productId, qty);
      } else {
        await refreshUserCart();
      }
    }
  }, [products]);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
