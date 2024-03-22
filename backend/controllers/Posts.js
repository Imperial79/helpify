import { PostModel } from "../models/Posts.js";
export const createPost = async (req, res) => {
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
  }