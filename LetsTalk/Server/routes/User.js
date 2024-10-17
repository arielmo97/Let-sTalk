import userController from '../controllers/User.js';
import express from 'express';

var userRouter = express.Router();

userRouter.route('/')
    .post(userController.createUser);

userRouter.route('/:username')
    .get(userController.verifyToken, userController.getUser);

export default userRouter;