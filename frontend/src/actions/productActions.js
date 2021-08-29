import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

import {
  PRODUCT_DETAILS_WISHLIST_FAIL,
  PRODUCT_DETAILS_WISHLIST_REQUEST,
  PRODUCT_DETAILS_WISHLIST_SUCCESS,
  PRODUCT_WISHLIST_FAIL,
  PRODUCT_WISHLIST_REQUEST,
  PRODUCT_WISHLIST_SUCCESS,
} from "../constants/wishListConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listWish = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_WISHLIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/wishlist");
    dispatch({ type: PRODUCT_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_WISHLIST_FAIL, payload: error.message });
  }
};

export const detailsListWishProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_WISHLIST_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/wishlist/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};