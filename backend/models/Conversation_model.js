import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

export const ConversationModel = mongoose.model("conversation", conversationSchema);
