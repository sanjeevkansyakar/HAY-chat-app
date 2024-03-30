import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { v4 as uuid } from "uuid";

import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";

import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";

// importing routes
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import adminRoute from "./routes/admin.route.js";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URL;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "welcometosanjuchannel";

// Mapping all connected or active users
const userSocketIDs = new Map();

connectDB(mongoURI);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
    res.send("Hello app");
});

// socket middleware function
io.use((socket, next) => {});

// Event listener for handling new connections.
// This function is triggered when a new client connects to the socket server.
io.on("connection", (socket) => {
    const user = {
        _id: "hausdh",
        name: "Aalu",
    };
    // Map the user's ID to their socket ID
    userSocketIDs.set(user._id.toString(), socket.id);
    console.log(userSocketIDs);

    console.log("User is connected", socket.id);

    // Event listener for handling new messages sent by the client
    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        // Prepare real-time message object to broadcast to other members
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        // Prepare message object to save in the database
        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        };

        // Get sockets of all members in the chat
        const membersSocket = getSockets(members);

        // Emit new message event to all members in the chat
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        });

        // Emit new message alert event to all members in the chat
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
            // Save the message in the database
            await Message.create(messageForDB);
        } catch (error) {
            console.log(error);
        }
    });

    // Event listener for handling disconnection of a client
    socket.on("disconnect", () => {
        console.log("User disconnected");
        // Remove the user's socket ID from the map on disconnection
        userSocketIDs.delete(user._id.toString());
    });
});

app.use(errorMiddleware);

server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
});

export { adminSecretKey, envMode, userSocketIDs };
