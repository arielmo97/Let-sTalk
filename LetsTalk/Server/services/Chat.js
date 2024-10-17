import chatModel from "../models/Chat.js";
import { messageModel } from "../models/Message.js";

const getHighestChatId = async () => {
    try {
        const chats = await chatModel.find({})
            .sort({ chatId: -1 }) // Sort in descending order based on _id
            .limit(1); // Limit the result to 1 chat

        if (chats.length > 0) {
            const maxChatId = chats[0].chatId;
            return maxChatId;
        } else {
            return 0; // If no chats found, return 0
        }
    } catch (err) {
        throw err; // Throw any errors that occurred during the query
    }
};


const createChat = async (currentUser, newContact) => {

    try {

        const chatId = await getHighestChatId() + 1;

        const users = [
            {
                username: currentUser.username,
                displayName: currentUser.displayName,
                profilePic: currentUser.profilePic
            },
            {
                username: newContact.username,
                displayName: newContact.displayName,
                profilePic: newContact.profilePic
            }
        ];
        const messages = [];

        const newChat = new chatModel({
            chatId,
            users,
            messages
        });

        await newChat.save();
        return chatId;

    } catch (error) {
        return false;
    }

};

const getChats = async (username) => {
    let allChats = [];

    try {
        const results = await chatModel.find({ "users.username": username });
        
        results.forEach(result => {
            const otherUser = result.users.find(user => user.username !== username);
            if (!otherUser) {
                return;
            }
            const chat = {
                id: result.chatId,
                user: {
                    username: otherUser.username,
                    displayName: otherUser.displayName,
                    profilePic: otherUser.profilePic
                },

                lastMessage: null
            };

            if (result.lastMessage) {
                chat.lastMessage = {
                    messageId: result.lastMessage.messageId,
                    created: result.lastMessage.timestamp,
                    sender: result.lastMessage.sender,
                    content: result.lastMessage.content
                }
            }

            allChats = [...allChats, chat];
        });
        return allChats;
    } catch (error) {
        return null;
    }


};

const postMessage = async (username, chatId, msgContent) => {
    try {
        const chat = await chatModel.findOne({ "chatId": chatId });
        const messageId = await messageModel.estimatedDocumentCount() + 1;
        const newMessage = new messageModel({
            messageId: messageId,
            sender: username,
            content: msgContent
        });

        await newMessage.save();


        chat.messages.push(newMessage);
        chat.lastMessage = newMessage;
        await chat.save();
        const result = {
            messageId: newMessage.messageId,
            sender: {
                username: newMessage.sender
            },
            created: newMessage.timestamp,
            content: newMessage.content
        };
        return result;


    } catch (error) {
        return false;
    }
};

const getMessages = async (chatId) => {
    try {
        const chat = await chatModel.findOne({ "chatId": chatId });
        let conversation = [];
        chat.messages.forEach(msg => {
            const message = {
                id: msg.messageId,
                created: msg.timestamp,
                sender: {
                    username: msg.sender
                },
                content: msg.content
            }

            conversation = [...conversation, message];
        });
        return conversation;

    } catch (error) {
        return null;
    }
};

const deleteChat = async (chatId) => {
    try {
        const targetChat = await chatModel.findOne({ "chatId": chatId });
        for (const message of targetChat.messages) {
            const msg = await messageModel.findOne({ "messageId": message.messageId });
            await msg.deleteOne();
        }
        await targetChat.deleteOne();
        return true;
    } catch (error) {
        return false;
    }
};


const chatsService = {
    createChat,
    getChats,
    postMessage,
    getMessages,
    deleteChat
};

export default chatsService;