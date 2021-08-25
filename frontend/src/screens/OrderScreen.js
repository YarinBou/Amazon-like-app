import React from "react";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  return (
    <div>
      <h2>Your order is on its way! We hope you are as excited as we are.</h2>
      <MessageBox>
        <Link to="/">Go back to Shopping</Link>
      </MessageBox>
    </div>
  );
}
