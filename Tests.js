/* eslint-disable no-unused-vars */
import fetch from "node-fetch";
import app from "./backend/server.js";
import userroute from "./backend/routers/userRouter.js";

let token = "";

function register() {
    const data = {
        username: "Gross",
        password: "1423SDFED%",
        email: "gros@post.idc.ac.il",
        fullName: "Yardena  Berkovic",
        rememberMe: true,
    };
    return (
        fetch("http://localhost:5000/api/register/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
        .then((data) => {
            if (data.status === 200) {
                console.log("Success register:" + data.status);
            } else if (data.status === 409) {
                console.log(
                    "FAILURE. status: " + data.status + ". user already exists "
                );
            } else {
                console.log("FAILURE. status: " + data.status);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function login() {
    const data = {
        username: "Gross",
        password: "1423SDFED%",
    };

    return (
        fetch("http://localhost:5000/api/login/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
            },
            credentials: "include",
        })
        .then((data) => {
            token = data.headers.get("set-cookie");
            console.log(
                "Success login: " + data.status + "user is connected successfully"
            );
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function addItemToCart() {
    const data = {
        productId: "1",
        qty: "3",
    };

    return (
        fetch("http://localhost:5000/api/addItemToCart/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            console.log("add this item to cart: ", data);
            if (res.status === 200) {
                console.log("Success addItemToCart:" + res.status);
            } else {
                console.log("FAILURE. status: " + res.status);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function removeItemFromCart() {
    const data = {
        productId: "1",
    };

    return (
        fetch("http://localhost:5000/api/removeItemFromCart/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            console.log("remove this item from cart: ", data);
            if (res.status === 200) {
                console.log("Success removeItemFromCart:" + res.status);
            } else {
                console.log("FAILURE. status: " + res.status);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function getUserCart() {
    return (
        fetch("http://localhost:5000/api/getUserCart/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log("Success get user cart:", data);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function getUserDetails() {
    return (
        fetch("http://localhost:5000/api/getUserDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log("Success user details :", data);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function getProduct() {
    return (
        fetch("http://localhost:5000/api/products/1", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
            },
            credentials: "include",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log("Success get product with the id=1:", data);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function setShippingAddress() {
    const data = {
        fullName: "Yardena  Berkovic",
        address: "Settlement Iksal, P.O. Box: 174",
        city: "Tel-Aviv",
        postalCode: "7752368",
        country: "israel",
    };
    console.log("add new shipping address: ", data);

    return fetch("http://localhost:5000/api/shipping/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cache: "no-cache",
            cookie: token,
        },
        credentials: "include",
    });
}

function setPaymentMethod() {
    const data = {
        PaymentMethod: "Paypal",
    };
    console.log("set payment method: ", data);
    return fetch("http://localhost:5000/api/payment/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cache: "no-cache",
            cookie: token,
        },
        credentials: "include",
    });
}

function getShippingDetails() {
    return (
        fetch("http://localhost:5000/api/getShippingDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log("Success The Shipping Details :", data);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

async function run() {
    console.log("Test");
    await register();
    await login();
    await getUserDetails();
    await getProduct();
    await addItemToCart();
    await getUserCart();
    await removeItemFromCart();
    await getUserCart();
    console.log("Done Tests!");
}

run();