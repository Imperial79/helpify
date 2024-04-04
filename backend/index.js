import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import { userRouter } from "./routes/Users.js";
import { postRouter } from "./routes/Post.js";
import { commentRouter } from "./routes/Comments.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
app.use("/images",express.static(path.join(__dirname,'public/uploads')));

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

mongoose
  .connect(
    `mongodb+srv://soumiksilco:${process.env.MONGO_PWD}@cluster0.gvzfyzv.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// mongoose.connect(
//   "mongodb://127.0.0.1:27017/helpify"
// ).then(()=>console.log("Database Connected"))
// .catch(e=>console.log(e));

app.get("/", (req, res) => {
  res.send("Hello universe!");
});
app.listen(8080, () => console.log("Server running at 8080"));
