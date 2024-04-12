import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/Users.js";
import { postRouter } from "./routes/Post.js";
import { commentRouter } from "./routes/Comments.js";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import { MessageModel } from "./models/Message_model.js";
import { conversationRouter } from "./routes/Conversation.js";
dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("directory-name 👉️", __dirname);

app.use(
  "/users-images",
  express.static(path.join(__dirname, "public/uploads/users"))
);
app.use(
  "/post-images",
  express.static(path.join(__dirname, "public/uploads/posts"))
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/chat", conversationRouter); // New route for chat

mongoose
  .connect(
    `mongodb+srv://soumiksilco:${process.env.MONGO_PWD}@cluster0.gvzfyzv.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello universe!");
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);

    try {
      const newMessage = new MessageModel({
        conversation: msg.conversationId,
        sender: msg.senderId,
        content: msg.content
      });
      await newMessage.save();

      // Emit the 'chat message' event to all connected clients
      io.emit('chat message', newMessage);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running at ${PORT}`));
