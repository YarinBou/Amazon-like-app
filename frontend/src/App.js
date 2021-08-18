import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Sticker'sForGeeks
            </Link>
          </div>
          {/* <SearchBox placeholder="Search..." handleChange={(e) => console.log(e.target.value)}></SearchBox> */}
          <div>
            <Link to="/like">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </Link>
            <Link to="/cart">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">
              <i class="fa fa-sign-in" aria-hidden="true"></i>
            </Link>
          </div>
        </header>
        <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
