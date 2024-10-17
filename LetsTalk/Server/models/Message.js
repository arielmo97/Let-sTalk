import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    messageId: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const messageModel = mongoose.model('MessageModel', messageSchema, 'Messages');

export { messageModel, messageSchema };

