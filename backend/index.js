import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/Users.js";
import { postRouter } from "./routes/Post.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

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
