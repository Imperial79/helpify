import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import { userRouter } from "./routes/Users.js";
import { postRouter } from "./routes/Post.js";
import { commentRouter } from "./routes/Comments.js";
import { chatRouter } from "./routes/Chats.js"; // New route for chat
import { Server } from "socket.io";
import { createServer } from 'http';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your client-side URL
    methods: ['GET', 'POST'],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('directory-name 👉️', __dirname);

app.use("/users-images", express.static(path.join(__dirname, 'public/uploads/users')));
app.use("/post-images", express.static(path.join(__dirname, 'public/uploads/posts')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/chat", chatRouter); // New route for chat

mongoose
  .connect(
    `mongodb+srv://soumiksilco:${process.env.MONGO_PWD}@cluster0.gvzfyzv.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello universe!");
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected');

  // Handle user joining a chat room
  socket.on('joinRoom', (roomId, userId) => {
    socket.join(roomId);

    // Notify other users in the room about the new user
    io.to(roomId).emit('userJoined', { userId, connectedUsers: Object.keys(io.sockets.adapter.rooms.get(roomId) || {}) });
  });

  // Handle receiving a message
  socket.on('sendMessage', (roomId, message, userId) => {
    console.log(`Received message in room ${roomId}: ${message}`);

    // Broadcast the message to all users in the room
    io.to(roomId).emit('receiveMessage', { message, userId });
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected');

    // Remove the user from any rooms they were in
    Object.keys(io.sockets.adapter.rooms).forEach((roomId) => {
      if (io.sockets.adapter.rooms.get(roomId).has(socket.id)) {
        io.to(roomId).emit('userLeft', { userId: socket.id, connectedUsers: Object.keys(io.sockets.adapter.rooms.get(roomId) || {}) });
        socket.leave(roomId);
      }
    });
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running at ${PORT}`));