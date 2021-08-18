import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from "axios";
import { useHistory } from 'react-router-dom';

export default function SigninScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const result = await Axios.post("/api/login",
                                      {'username': username, 'password': password, 'rememberMe': rememberMe});

      history.push("/");  
    }
    catch (e){
      console.log(e.response.data.validationError);
      setErrorMessage(e.response.data.validationError);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
  <h1>Sign In</h1>
        </div>
  <div>{errorMessage}</div>
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
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
          <div>
            <input type="checkbox" id="remember_me" onChange={(e) => setRememberMe(e.target.value)}></input> <label htmlFor="remember_me">Remember me</label>
          </div>
        </div>
      </form>
    </div>
  );
}