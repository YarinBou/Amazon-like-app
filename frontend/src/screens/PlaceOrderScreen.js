import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function PlaceOrderScreen(props) {
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState([]);
  const [address, setAddress] = useState([]);
  const [city, setCity] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [country, setCountry] = useState([]);
  const [PaymentMethod, setPaymentMethod] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const refreshUserCart = async (e) => {
    try {
      const result = await axios.get("/api/getUserCart");
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
      console.log(e);
      setCartItems([]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      history.push("/orderScreen");
      await axios.post("/api/removeCart");
    } catch (e) {
      console.log(e.response.data.validationError);
    }
  };

  useEffect(async () => {
    try {
      refreshUserCart();
      const result = await axios.get("/api/getShippingDetails");
      const { fullName, address, city, postalCode, country, PaymentMethod } =
        result.data;
      setFullName(fullName);
      setAddress(address);
      setCity(city);
      setPostalCode(postalCode);
      setCountry(country);
      setPaymentMethod(PaymentMethod);
    } catch (e) {
      console.log(e.response.data.validationError);
    }
  }, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4>
        {" "}
      </CheckoutSteps>{" "}
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2> Shipping </h2>{" "}
                <p>
                  <strong>Name:</strong> {fullName} <br />
                  <strong>Address: </strong> {address},{city}, {postalCode},
                  {country}
                </p>
                <p></p>{" "}
              </div>{" "}
            </li>{" "}
            <li>
              <div className="card card-body">
                <h2> Payment </h2>{" "}
                <p>
                  {" "}
                  <strong>Method:</strong>
                  {PaymentMethod}{" "}
                </p>{" "}
              </div>{" "}
            </li>{" "}
            <li>
              <div className="card card-body">
                <h2> Order Items </h2>{" "}
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2> Order Summary </h2>{" "}
              </li>{" "}
              <li>
                <div className="row">
                  <div> Items </div> ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                  items){" "}
                </div>{" "}
              </li>{" "}
              <li>
                <div className="row">
                  <div> Shipping </div>{" "}
                  <div>
                    $
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0) > 100
                      ? 10
                      : 0}
                  </div>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                <div className="row">
                  <div> Tax </div>{" "}
                  <div>
                    ${0.15 * cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </div>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total </strong>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <strong>
                      Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                      items) : $
                      {(cartItems.reduce((a, c) => a + c.price * c.qty, 0) > 100
                        ? 10
                        : 0) +
                        0.15 *
                          cartItems.reduce((a, c) => a + c.price * c.qty, 0) +
                        cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                <button
                  className="primary block"
                  type="submit"
                  onClick={submitHandler}
                >
                  Place Order{" "}
                </button>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
