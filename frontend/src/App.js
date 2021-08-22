import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Axios from "axios";

function App() {
  const [username, setUserName] = useState(undefined);
  const [cartSize, setCartSize] = useState(undefined);

  useEffect(async () => {
    try {
      const result = await Axios.get("/api/getUserDetails");
      const { username, cartSize } = result.data;
      setUserName(username);
      setCartSize(cartSize);
    } catch (e) {
      console.log(e.response.data.validationError);
      setUserName(null);
      setCartSize(0);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Sticker'sForGeeks
            </Link>
          </div>
          <div>
            <Link to="/like">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </Link>
            <Link to="/cart">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </Link>
            <Link to={username ? "/logout" : "/login"}>
              {username === undefined ? (
                "..."
              ) : username === null ? (
                <i class="fa fa-sign-in" aria-hidden="true">
                <span class="userName"> login</span></i>
              ) : (
                <i class="fa fa-sign-out" aria-hidden="true">
                <span class="userName"> logout</span></i>
              )}
            </Link>
            {/* {username === null && <Link to="/register">Register</Link>} */}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/logout" component={LogoutScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
