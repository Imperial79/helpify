import { PostModel } from "../models/Post_model.js";

export const allPosts = async (req, res) => {
  try {
    const Posts = await PostModel.find({});
    console.log(Posts);
    res.status(200).json(Posts);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};

export const profilePost = async (req, res) => {
  try {
    const user_id = req.params.userID;
    const Posts = await PostModel.find({ user_id });
    console.log(Posts);
    res.status(200).json(Posts);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};

export const createPost = async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    // console.log(req.body);
    const newPost = new PostModel({
      user_id,
      title,
      content,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};

export const likePost = async (req, res) => {
  const { postID } = req.params;
  const { userID } = req.body;

  try {
    const post = await PostModel.findById(postID);

    if (!post) {
      return res.status(404).json({ error: true,message:'Post not found' });
    }
    const isLiked = post.likes.includes(userID);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userID);
    } else {
      post.likes.push(userID);
    }
    await post.save();
    res.json({ success: true, likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true,message: 'Something went wrong' });
  }
}