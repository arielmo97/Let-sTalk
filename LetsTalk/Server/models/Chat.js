import mongoose from "mongoose";
import { messageSchema } from "./Message.js";
const Schema = mongoose.Schema


const chatSchema = new Schema({
    chatId: {
        type: Number,
        required: true
    },
    users: [
        {
            username: {
                type: String,
                required: true
            },
            displayName: {
                type: String,
                required: true
            },
            profilePic: {
                type: String,
                required: true
            }
        }
        
    ],
    lastMessage: {
        type: messageSchema,
        default: null
    },
    messages: [
        messageSchema
    ]
});


const chatModel = mongoose.model('ChatModel', chatSchema, 'Chats');

export default chatModel;