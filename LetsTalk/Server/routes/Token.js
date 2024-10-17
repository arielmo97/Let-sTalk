import express from 'express';
import userController from '../controllers/User.js';

var tokenRouter = express.Router();

tokenRouter.route('/')
    .post(userController.getToken);


export default tokenRouter;