import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
// import cookieParser from 'cookie-parser';
import fs from 'fs';
import JSON5 from 'json5';

const USER_DATA_FILE_PATH = 'backend/data/users.json5'

const userRouter = express.Router();
userRouter.use(express.json());

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
  
function isAuthenticated(req){
    const cookie = req.cookies.loginCookie;
    if (cookie === undefined) 
        return false;
    const user = findUser(cookie['username']);
    if (!user){
        return new ValidationResult('Unknown username', null);
    }
    return validateEncryptedPassword(user, cookie['password']);
}
  
// userRouter.use(cookieParser);
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
    const maxAge = req.body.rememberMe ? 60*60*24*30 : 60*30;
    const cookieData = {'username': username, 'password': validationResult.encryptedPassword}
    res.cookie('loginCookie', cookieData, { maxAge: maxAge, httpOnly: true });
    res.status(200).send();
});

userRouter.post('/api/signup', (req, res) => {
    const username = req.body.username;
    if (findUser(username) != null){
        res.status(409).send({
            'error': 'User already exists'
        });
        return;
    }
    const encryptedPassword = req.body.password;
    if (encryptedPassword.length <= 6){
        res.status(400).send({
            'error': 'Password is too short'
        });
        return;
    }

    const newUser = createNewUser(username, unencryptedPassword, req.body.fullName, req.body.email);

    const allUsers = JSON5.parse(fs.readFileSync(USER_DATA_FILE_PATH));
    allUsers.push(newUser);
    fs.writeFileSync(USER_DATA_FILE_PATH, JSON5.stringify(allUsers));

    const maxAge = 60*30;
    const cookieData = {'username': newUser.username, 'password': newUser.password}
    res.cookie('loginCookie', cookieData, { maxAge: maxAge, httpOnly: true });
    res.status(201).redirect('/home');
})

export default userRouter;