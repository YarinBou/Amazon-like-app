import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { addToWishList, removeFromWishList } from '../actions/wishListActions';


export default function WishListScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
      ? Number(props.location.search.split('=')[1])
      : 1;
      const dispatch = useDispatch();
      const wishList = useSelector((state) => state.wishList);
      const { wishListItems } = wishList;
      useEffect(() => {
        if (productId) {
          dispatch(addToWishList(productId, qty));
        }
      }, [dispatch, productId, qty]);

      const removeFromWishListHandler = (id) => {
        dispatch(removeFromWishList(id));
    };
    

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Your Wishlist</h1>
        {wishListItems.length === 0 ? (
          <MessageBox>
           Wishlist is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {wishListItems.map((item) => (
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
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromWishListHandler(item.product)}
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
                Subtotal ({wishListItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {wishListItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
