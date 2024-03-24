import { PostModel } from "../models/Posts.js";

export const allPosts = async (req, res) => {
  try {
    const Posts = await PostModel.find({});
    console.log(Posts)
    res.status(200).json(Posts);
    
  } catch (e) {
    res.sendStatus(400).send(e);
  }
}


export const profilePost = async (req, res) => {
  try {
    const user_id = req.params.userID;
    const Posts = await PostModel.find({user_id});
    console.log(Posts)
    res.status(200).json(Posts);
    
  } catch (e) {
    res.sendStatus(400).send(e);
  }
}

export const createPost = async (req, res) => {
    try {
      const { user_id, title, content } = req.body;
      // console.log(req.body);
      const newPost = new PostModel({
          user_id,
          title,
          content
      });
      await newPost.save();
      res.status(200).json(newPost);
    } catch (e) {
      res.sendStatus(400).send(e);
    }
  }