import React, { useState } from "react";
import Axios from "axios";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/api/register", {
        username: username,
        password: password,
        email: email,
        fullName: fullName,
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
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Register</h1>
        </div>
        <div>{errorMessage}</div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            required
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <div>
            <label htmlFor="remember_me">
              Remember me{" "}
              <input
                type="checkbox"
                id="remember_me"
                onChange={(e) => setRememberMe(e.target.value)}
              ></input>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
