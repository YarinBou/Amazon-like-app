import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Axios from "axios";

export default function PaymentMethodScreen(props) {
  const [PaymentMethod, setPaymentMethod] = useState("");
  let history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      history.push("/placeorder");
      await Axios.post("/api/Payment", {
        PaymentMethod: PaymentMethod,
      });
      document.location = "/";
    } catch (e) {
      console.log(e.response.data.validationError);
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
