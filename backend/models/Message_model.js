import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const MessageModel = mongoose.model("message",messageSchema);