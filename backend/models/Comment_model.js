import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  export const CommentModel = mongoose.model("comments", commentSchema);
