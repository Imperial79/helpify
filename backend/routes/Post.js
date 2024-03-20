import express from "express";
import { PostModel } from "../models/Posts.js";

const router = express.Router();

router.post("/add-post", async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    const newPost = new PostModel({
        user_id,
        title,
        content
    });
    await newPost.save();
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

export {router as postRouter};