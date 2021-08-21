import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import JSON5 from 'json5';

const USER_DATA_FILE_PATH = 'backend/data/users.json5'
const CART_DATA_FILE_PATH = 'backend/data/cart.json5'

const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(cookieParser());

class ValidationResult{
    constructor(validationError, encryptedPassword){
        this.validationError = validationError;
        this.encryptedPassword = encryptedPassword;
    }
}

function findUser(username){
    const allUsers = JSON5.parse(fs.readFileSync(USER_DATA_FILE_PATH));
    for(const user of allUsers){
        if (user.username != username) continue;
        return user;
    }
    return null;
}

function createNewUser(username, password, fullName, email){
    const salt = bcrypt.genSaltSync()
    return {
        username: username,
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, salt),
        encryptionSalt: salt,
        isAdmin: false,
    }
}

function validateEncryptedPassword(user, encryptedPassword){
    console.log(`${user.password} vs ${encryptedPassword}`);
    if (encryptedPassword !== user.password){
        return new ValidationResult('Incorrect password', null);
    }
    else{
        return new ValidationResult(null, encryptedPassword);
    }
}

function validateUnecryptedPassword(username, unencryptedPassword){
    const user = findUser(username);
    if (user == null){
        return new ValidationResult('Unknown username', null);
    }
    const encryptedPassword = bcrypt.hashSync(unencryptedPassword, user.encryptionSalt);
    return validateEncryptedPassword(user, encryptedPassword);
}

// function isAuthenticated(req){
//     const cookie = req.cookies.loginCookie;
//     if (cookie === undefined) 
//         return false;
//     const user = findUser(cookie['username']);
//     if (!user){
//         return new ValidationResult('Unknown username', null);
//     }
//     return validateEncryptedPassword(user, cookie['password']);
// }

userRouter.post('/api/login', (req, res) => {
    const username = req.body.username;
    const validationResult = validateUnecryptedPassword(username, req.body.password);
    console.log(validationResult);
    if (validationResult.validationError){
        res.status(401).send({
            validationError: validationResult.validationError
        });
        return;
    }
    const maxAgeMinutes = req.body.rememberMe ? 60*24*30 : 30;
    const maxAge = 1000 * 60 * maxAgeMinutes;
    const cookieData = {'username': username, 'password': validationResult.encryptedPassword};
    res.cookie('loginCookie', cookieData, { maxAge: maxAge, httpOnly: true });
    res.status(200).send();
});

userRouter.get('/api/getUserDetails', (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: 'No cookie'
        });
        return;
    }
    console.log(loginCookie.username, loginCookie.password);
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(user, loginCookie.password);
    console.log(validationResult);
    if (validationResult.validationError){
        res.status(401).send({
            validationError: validationResult.validationError
        });
        return;
    }
    const allUsersCart = JSON5.parse(fs.readFileSync(CART_DATA_FILE_PATH));
    res.status(200).send({
        'username': loginCookie.username,
        'cartSize': (allUsersCart[loginCookie.username] || []).length
    });
});

userRouter.post('/api/register', (req, res) => {
    const {username, password, email, fullName, rememberMe} = req.body;
    if (findUser(username) != null){
        res.status(409).send({
            'validationError': 'User already exists'
        });
        return;
    }
    const encryptedPassword = req.body.password;
    if (encryptedPassword.length <= 6){
        res.status(400).send({
            'validationError': 'Password is too short'
        });
        return;
    }

    const newUser = createNewUser(username, password, fullName, email);

    const allUsers = JSON5.parse(fs.readFileSync(USER_DATA_FILE_PATH));
    allUsers.push(newUser);
    fs.writeFileSync(USER_DATA_FILE_PATH, JSON5.stringify(allUsers, null, 2));

    const maxAgeMinutes = rememberMe ? 60*24*30 : 30;
    const maxAge = 1000 * 60 * maxAgeMinutes;
    const cookieData = {'username': newUser.username, 'password': newUser.password};
    res.cookie('loginCookie', cookieData, { maxAge: maxAge, httpOnly: true });
    res.status(200).send();
})

userRouter.get('/api/logout', (req, res) => {
    res.clearCookie('loginCookie');
    res.status(200).send();
})

userRouter.get('/api/getUserCart', (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: 'No cookie'
        });
        return;
    }
    console.log(loginCookie.username, loginCookie.password);
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(user, loginCookie.password);
    console.log(validationResult);
    if (validationResult.validationError){
        res.status(401).send({
            validationError: validationResult.validationError
        });
        return;
    }
    const allUsersCart = JSON5.parse(fs.readFileSync(CART_DATA_FILE_PATH));
    res.status(200).send({
        'userCartItems': allUsersCart[loginCookie.username] || []
    });
});

userRouter.post('/api/addItemToCart', (req, res) => {
    const { productId, qty } = req.body;
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: 'No cookie'
        });
        return;
    }
    console.log(loginCookie.username, loginCookie.password);
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(user, loginCookie.password);
    console.log(validationResult);
    if (validationResult.validationError){
        res.status(401).send({
            validationError: validationResult.validationError
        });
        return;
    }
    const allUsersCart = JSON5.parse(fs.readFileSync(CART_DATA_FILE_PATH));
    allUsersCart[loginCookie.username] = allUsersCart[loginCookie.username] || {};
    allUsersCart[loginCookie.username][productId] = qty;
    fs.writeFileSync(CART_DATA_FILE_PATH, JSON5.stringify(allUsersCart, null, 2));
    res.status(200).send();
});

userRouter.post('/api/removeItemFromCart', (req, res) => {
    const { productId } = req.body;
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: 'No cookie'
        });
        return;
    }
    console.log(loginCookie.username, loginCookie.password);
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(user, loginCookie.password);
    console.log(validationResult);
    if (validationResult.validationError){
        res.status(401).send({
            validationError: validationResult.validationError
        });
        return;
    }
    const allUsersCart = JSON5.parse(fs.readFileSync(CART_DATA_FILE_PATH));
    allUsersCart[loginCookie.username] = allUsersCart[loginCookie.username] || {};
    delete allUsersCart[loginCookie.username][productId];
    fs.writeFileSync(CART_DATA_FILE_PATH, JSON5.stringify(allUsersCart, null, 2));
    res.status(200).send();
});

export default userRouter;