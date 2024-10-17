import express from 'express';
import { Router } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import appEnv from 'custom-env';
import userRouter from './routes/User.js'
import tokenRouter from './routes/Token.js';
import chatsRouter from './routes/Chat.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import initializeSocket from './socket.js';


// init server middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.json({ limit: '25mb' }));
app.use(express.static('public'));
appEnv.env(process.env.NODE_ENV, './config');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// establish connection with database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to DB: ${process.env.CONNECTION_STRING}`))
    .catch((error) => console.log(`Failed to connect to DB`));


// Define a route for the homepage ('/')
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route for the homepage ('/')
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/api/Users', userRouter);
app.use('/api/Tokens', tokenRouter);
app.use('/api/Chats', chatsRouter);


const server = http.createServer(app);
// Initialize socket.io
const io = initializeSocket(server);


// set server to listen to incoming requests
server.listen(process.env.PORT, () => {
    console.log(`Server listens on port: ${process.env.PORT}`);
})

