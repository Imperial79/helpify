import { CommentModel } from "../models/Comment_model.js";
import { UserModel } from "../models/User_model.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { content, userID, postID, parent_id } = req.body;
    const user = await UserModel.findById(userID);
    const commentData = {
      content,
      user_id: userID,
      name: user.name,
      post_id: postID,
      parent_id: parent_id,
    };
    const newComment = new CommentModel(commentData);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (e) {
    res.status(400).json({ error: true, message: e.message });
  }
};

// Get all comments for a post
export const getComments = async (req, res) => {
  try {
    const post_id = req.params.postID;
    const comments = await CommentModel.find({ post_id });
    res.json(comments);
  } catch (e) {
    res.status(500).json({ error: true, message: e.message });
  }
};

// Like a comment
export const likeComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentID);
    const userID = req.body.userID;
    const isLiked = comment.likes.includes(userID);
    if (isLiked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userID);
    } else {
      comment.likes.push(userID);
    }
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
