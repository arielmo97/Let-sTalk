import userService from '../services/User.js';

const createUser = async (req, res) => {
    const {username, password, displayName, profilePic} = req.body;
    const result = await userService.createUser(username, password, displayName, profilePic);
    if (result === true) {
        res.status(200).json({username, displayName, profilePic});
    } else {
        const errors = result.reduce((acc, error) => {
            acc[error[0]] = error;
            return acc;
        }, {});
        if(errors.hasOwnProperty('e')){
            res.status(409).json(errors);
        } else{
            res.status(400).json(errors);
        }
    }
}


const getToken = async (req, res) => {
    const {username, password} = req.body;
    const token = await userService.generateToken(username, password);
    if (token === -1) {
        res.status(404).send('Incorrect username or password');
    } else {
        res.status(200).send(token);
    }
}


const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const reqUser = req.params.username;
        const user = await userService.verifyToken(authHeader, reqUser, true);
        if (!user) {
            throw new Error();
        } else {
            req.body.username = user;
            return next();
        }
        
    } catch (error) {
        console.log('redirecting');
        res.status(404).header('Token-Error-Message', 'Bad token').redirect('/');
    }   
}

const getUser = async (req, res) => {
    const user = await userService.getUser(req.body.username);
    const {username, displayName, profilePic} = user
    res.status(200).json({username, displayName, profilePic});
}

const userController = {
    createUser,
    getToken,
    verifyToken,
    getUser
}

export default userController;