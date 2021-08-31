"use strict";
import JSON5 from "json5";
import bcrypt from "bcryptjs";

import fs from "fs";
const USER_DATA_ACTIVITY = "backend/data/usersActivities.json5";
const USER_DATA_FILE_PATH = "backend/data/users.json5";
const CART_DATA_FILE_PATH = "backend/data/cart.json5";
const PRODUCTS_FILE_PATH = "backend/data/products.json5";
const USER_SHIPPING_DATA_FILE_PATH = "backend/data/shippingData.json5";
const USER_PURCHASES_FILE_PATH = "backend/data/purchases.json5";

function createNewUser(username, password, fullName, email) {
    const salt = bcrypt.genSaltSync();
    return {
        username: username,
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, salt),
        encryptionSalt: salt,
        isAdmin: false,
    };
}

function createActivityLog(activityType, DateAndTime, username, activityState) {
    return {
        username: username,
        DateAndTime: DateAndTime,
        activityType: activityType,
        activityState: activityState,
    };
}

function createProductRecord(
    id,
    name,
    category,
    image,
    price,
    brand,
    countInStock,
    description
) {
    return {
        _id: id,
        name: name,
        category: category,
        image: image,
        price: price,
        brand: brand,
        countInStock: countInStock,
        description: description,
        reviews: [],
    };
}
export function insertToUsersActivities(activityType, username, activityState) {
    const usersActivities = JSON5.parse(fs.readFileSync(USER_DATA_ACTIVITY));

    usersActivities.push(
        createActivityLog(activityType, new Date(), username, activityState)
    );
    fs.writeFileSync(
        USER_DATA_ACTIVITY,
        JSON5.stringify(usersActivities, null, 2)
    );
}

function getHigestProdcutId() {
    const idList = [];
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    for (const product of allProducts) {
        idList.push(parseInt(product._id));
    }
    return Math.max(...idList);
}

export function insertToProdcuts(
    name,
    category,
    image,
    price,
    brand,
    countInStock,
    description
) {
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const productId = getHigestProdcutId() + 1;
    allProducts.push(
        createProductRecord(
            productId,
            name,
            category,
            image,
            price,
            brand,
            countInStock,
            description
        )
    );
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON5.stringify(allProducts, null, 2));
}

export function insertProductReview(rating, text, productId) {
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    for (const product of allProducts) {
        if (product._id === productId) {
            product.reviews.push({ rating, text });
            break;
        }
    }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON5.stringify(allProducts, null, 2));
}

export function getAllUsers() {
    return JSON5.parse(fs.readFileSync(USER_DATA_FILE_PATH));
}

export function getAllUsersCart() {
    return JSON5.parse(fs.readFileSync(CART_DATA_FILE_PATH));
}

export function getAllProducts() {
    return JSON5.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
}

export function getActivity() {
    return JSON5.parse(fs.readFileSync(USER_DATA_ACTIVITY));
}

export function getUserShipping() {
    return JSON5.parse(fs.readFileSync(USER_SHIPPING_DATA_FILE_PATH));
}

export function getUserPurchases() {
    return JSON5.parse(fs.readFileSync(USER_PURCHASES_FILE_PATH));
}

export function insertToUsers(username, password, fullName, email) {
    const allUsers = JSON5.parse(fs.readFileSync(USER_DATA_FILE_PATH));
    const newUser = createNewUser(username, password, fullName, email);
    allUsers.push(newUser);
    fs.writeFileSync(USER_DATA_FILE_PATH, JSON5.stringify(allUsers, null, 2));
}

export function insertProductToUserCart(username, productId, qty) {
    const allUsersCart = getAllUsersCart();
    allUsersCart[username] = allUsersCart[username] || {};
    allUsersCart[username][productId] = qty;
    fs.writeFileSync(CART_DATA_FILE_PATH, JSON5.stringify(allUsersCart, null, 2));
}

export function insertPurchaseToUser(username, orderNumber, purchase) {
    const allUsersPurchases = getUserPurchases();
    allUsersPurchases[username] = allUsersPurchases[username] || {};
    allUsersPurchases[username][orderNumber] = purchase;
    fs.writeFileSync(
        USER_PURCHASES_FILE_PATH,
        JSON5.stringify(allUsersPurchases, null, 2)
    );
}

export function deleteProductFromUserCart(username, productId) {
    const allUsersCart = getAllUsersCart();
    allUsersCart[username] = allUsersCart[username] || {};
    delete allUsersCart[username][productId];
    fs.writeFileSync(CART_DATA_FILE_PATH, JSON5.stringify(allUsersCart, null, 2));
}

export function deleteUserCart(username) {
    const allUsersCart = getAllUsersCart();
    delete allUsersCart[username];
    fs.writeFileSync(CART_DATA_FILE_PATH, JSON5.stringify(allUsersCart, null, 2));
}

export function insertShippingDetails(
    username,
    fullName,
    address,
    city,
    postalCode,
    country
) {
    const ShippingDetails = getUserShipping();

    ShippingDetails[username] = { fullName, address, city, postalCode, country };
    fs.writeFileSync(
        USER_SHIPPING_DATA_FILE_PATH,
        JSON5.stringify(ShippingDetails, null, 2)
    );
}

export function insertPaymentMethod(username, paymentMethod) {
    const ShippingDetails = JSON5.parse(
        fs.readFileSync(USER_SHIPPING_DATA_FILE_PATH)
    );
    ShippingDetails[username]["PaymentMethod"] = paymentMethod;

    fs.writeFileSync(
        USER_SHIPPING_DATA_FILE_PATH,
        JSON5.stringify(ShippingDetails, null, 2)
    );
}