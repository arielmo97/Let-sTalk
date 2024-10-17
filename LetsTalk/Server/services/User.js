import userModel from '../models/User.js';
import jwt from 'jsonwebtoken';

const usernameFormat = /^(?=.*[a-zA-Z])[a-zA-Z\d]*$/;
const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

const createUser = async (username, password, displayName, profilePic) => {
    let errors = [];
    try {
        const user = await userModel.findOne({username});
        if (user) {
            errors.push('exists');
            throw new Error(errors);
        }
        if (!usernameFormat.test(username)) {
            errors.push('username format incorrect');
        }
        if (displayName.length > 20) {
            errors.push('displayName cant be more than 20 letters');
        }
        if (!passwordFormat.test(password)) {
            errors.push('password is not in the correct format');
        }
        
        if (errors.length === 0) {
            const newUser = new userModel({
                username,
                password,
                displayName,
                profilePic
            });
            await newUser.save();
            return true;
        } else {
            throw new Error(errors);
        }
        
    } catch (error) {
        return errors;
    }
}

const generateToken = async (username, password) => {
    
    try {
        const foundUser = await getUser(username);
        if (foundUser === null || username !== foundUser.username || password !== foundUser.password) {
            throw new Error();
        } else {
            const user = { username: username, password: password };
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            return token;
        }
    } catch (error) {
        return -1;
    }
}

const verifyToken = async (authHeader, reqUser, loginFlag) => {
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return null;
    }
    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (loginFlag && user.username !== reqUser) {
            throw new Error('Bad token');
        }
        return user.username;
    } catch (error) {
        return null;
    }
}

const getUser = async (username) => {
    const dbResult = await userModel.findOne({username});
    return dbResult;

}


const userService = {
    createUser,
    generateToken,
    verifyToken,
    getUser,
}

export default userService;