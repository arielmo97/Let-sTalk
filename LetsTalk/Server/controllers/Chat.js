import chatsService from "../services/Chat.js";
import userService from "../services/User.js";


let io;
const initialize = (socketIo) => {
    io = socketIo;
};

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const currentUser = await userService.verifyToken(authHeader, null, false);
        if (!currentUser) {
            throw new Error();
        } else {
            req.body.verifiedUser = currentUser;
            return next();
        }
    } catch (error) {
        res.status(401).header('Token-Error-Message', 'Bad token').redirect('/');
        return null;
    }
};

const swapFields = async (req, res, next) => {
    const newContact = req.body.username;
    const username = req.body.verifiedUser;
    req.body = { username, newContact };
    return next();
}

const findUser = async (req, res, next) => {
    try {
        const newContact = await userService.getUser(req.body.newContact);
        if (!newContact) {
            throw new Error();
        } else {
            const currentUser = await userService.getUser(req.body.username);
            if (currentUser.username === newContact.username) {
                throw new Error();
            }
            req.body = { currentUser, newContact };
            return next();
        }
    } catch (error) {
        res.status(404).send(`${req.body.newContact} was not found`);
        return null;
    }
};

const createChat = async (req, res) => {
    var { username, displayName, profilePic } = req.body.currentUser;
    const currentUser = { username, displayName, profilePic };
    var { username, displayName, profilePic } = req.body.newContact;
    const newContact = { username, displayName, profilePic };
    const result = await chatsService.createChat(currentUser, newContact);
    if (!result) {
        res.status(503).send('Database Error');
    } else {
        const id = result;
        const user = newContact;
        res.status(200).json({ id, user });
    }

};

const getChats = async (req, res) => {
    const allChats = await chatsService.getChats(req.body.verifiedUser);
    if (!allChats) {
        // no such chat exists
        res.status(200).json([]);
    } else {
        res.status(200).json(allChats);
    }
};

const postMessage = async (req, res) => {
    const username = req.body.verifiedUser;
    const chatId = req.params.id;
    const msgContent = req.body.msg;
    const result = await chatsService.postMessage(username, chatId, msgContent);
    if (!result) {
        res.status(503).send('Database Error');
    } else {
        res.status(200).json(result);
    }
};

const getMessages = async (req, res) => {
    const chatId = req.params.id;
    const conversation = await chatsService.getMessages(chatId);
    if (!conversation) {
        res.status(503).send('Database Error');
    } else {
        res.status(200).json(conversation);
    }
};

const deleteChat = async (req, res) => {
    const result = await chatsService.deleteChat(req.params.id, req.body.verifiedUser);
    if (result) {
        res.status(200).send('Deleted succefully');
    } else {
        res.status(404).send('Not found');
    }
};


const chatController = {
    verifyToken,
    swapFields,
    findUser,
    createChat,
    getChats,
    postMessage,
    getMessages,
    deleteChat
};

export default chatController;




