import { Server } from "socket.io";

// Save the user's current room.
const userRooms = new Map();

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "DELETE"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("joinRoom", (chatid) => {
            //console.log("join: ", chatid);
            const room = String(chatid); // Convert room ID to string
            socket.join(room); // join the room if the data is really chat.id
        });

        socket.on("sendMessage", (msgData) => {
            const room = String(msgData.id); // Convert room ID to string
            //console.log("new messgae arrive: ", room);
            socket.to(room).emit("messageArrived", msgData);
            //console.log("sent message arrived to: ", msgData.id);
            //io.emit("messageArrived", msgData);
        });

        socket.on("addNewContact", (chatId) => {
            io.emit("newContact", chatId);
        });

         socket.on("deleteChat", (chatId)=> {
             const room = String(chatId); // Convert room ID to string
             //console.log("hello: ", room)
             socket.to(room).emit("chatDeleted");
             //socket.leave(room);
         });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

export default initializeSocket;