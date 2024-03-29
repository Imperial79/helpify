import { CommentModel } from '../models/Comment_model.js';
import { UserModel } from '../models/User_model.js';


// Create a new comment
export const createComment  = async (req, res) => {
  try {
    const { content, userID, postID } = req.body;
    const user = await UserModel.findById(userID);
    const newComment = new CommentModel({ content, user_id:userID,name:user.name, post_id:postID });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
    console.log();
  } catch (e) {
    res.status(400).json({error:true, message: e.message });
  }
};

// Get all comments for a post
export const getComments =  async (req, res) => {
  try {
    const post_id = req.params.postID;
    // console.log(post_id)
    const comments = await CommentModel.find({post_id});
    res.json(comments);
  } catch (e) {
    res.status(500).json({error:true, message: e.message });
  }
};

// Like a comment
export const likeComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    comment.likes.push(req.body.userId);
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
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};