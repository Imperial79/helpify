import { PostModel } from "../models/Post_model.js";

export const allPosts = async (req, res) => {
  try {
    const place_id = req.params.place_id;
    const Posts = await PostModel.find({ place_id });

    res.status(200).json(Posts);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};

export const profilePost = async (req, res) => {
  try {
    const user_id = req.params.userID;
    const Posts = await PostModel.find({ user_id });
    res.status(200).json(Posts);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};

export const createPost = async (req, res) => {
  try {
    const { user_id, title, content, place_id } = req.body;
    const fileName = req.file !== undefined ? req.file.filename : "";

    const newPost = new PostModel({
      user_id,
      title,
      content,
      place_id,
      image: fileName,
    });
    const post = await newPost.save();
    res.json({
      error: false,
      message: "Post created successfully!",
      response: post,
    });
  } catch (e) {
    res.json({
      error: true,
      message: "Something went wrong! " + e,
    });
  }
};

export const deletePost = async (req, res) => {
  const { postID } = req.params;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postID);
    if (!deletedPost) {
      return res.status(404).json({ error: true, message: "Post not found" });
    }

    res.json({ error: false, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const likePost = async (req, res) => {
  const { postID } = req.params;
  const { userID } = req.body;

  try {
    const post = await PostModel.findById(postID);

    if (!post) {
      return res.status(404).json({ error: true, message: "Post not found" });
    }

    if (post.likes.includes(userID)) {
      post.likes = post.likes.filter((id) => id.toString() !== userID);
    } else {
      post.likes.push(userID);
    }
    await post.save();
    res.json({ error: false, likes: post.likes, response: post });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: true, message: `Something went wrong ${error}` });
  }
};
