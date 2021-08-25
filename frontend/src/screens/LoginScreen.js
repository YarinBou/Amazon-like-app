import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import CheckoutSteps from "../components/CheckoutSteps";

export default function SigninScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/api/login", {
        username: username,
        password: password,
        rememberMe: rememberMe,
      });
      document.location = "/";
    } catch (e) {
      console.log(e.response.data.validationError);
      setErrorMessage(e.response.data.validationError);
    }
  };

  return (
    <div>
      <CheckoutSteps step1> </CheckoutSteps>{" "}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> Login </h1>{" "}
        </div>{" "}
        <div> {errorMessage} </div>{" "}
        <div>
          <label htmlFor="username"> Username </label>{" "}
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>{" "}
        </div>{" "}
        <div>
          <label htmlFor="password"> Password </label>{" "}
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>{" "}
        </div>{" "}
        <div>
          <button className="primary" type="submit">
            Login{" "}
          </button>{" "}
        </div>{" "}
        <div>
          <div>
            New customer ? <Link to="/register"> Create your account </Link>{" "}
          </div>{" "}
          <div>
            <label htmlFor="remember_me">
              Remember me{" "}
              <input
                type="checkbox"
                id="remember_me"
                onChange={(e) => setRememberMe(e.target.value)}
              ></input>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}
