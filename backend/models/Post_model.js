import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String },
  postType:{type: String, default: 'Announcement'},
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  image: {type:String,default:""},
  place_id: {type:String, ref: "location"},
  donation:{
    target: {type:Number, default: 0, required: true},
    amount: {type:Number, default: 0, required: true},
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PostModel = mongoose.model("post", PostSchema);
