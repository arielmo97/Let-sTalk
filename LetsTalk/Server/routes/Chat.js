import express from 'express';
import chatController from '../controllers/Chat.js';

var chatsRouter = express.Router();

chatsRouter.route('/')
    .post(chatController.verifyToken, chatController.swapFields, chatController.findUser, chatController.createChat)
    .get(chatController.verifyToken, chatController.getChats);

chatsRouter.route('/:id/Messages')
    .post(chatController.verifyToken, chatController.postMessage)
    .get(chatController.verifyToken, chatController.getMessages);

chatsRouter.route('/:id')
    .delete(chatController.verifyToken, chatController.deleteChat);

export default chatsRouter;