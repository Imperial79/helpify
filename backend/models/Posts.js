import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
    {
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required: true},
        title:{type:String,required: true},
        content:{type:String,required: true, unique: true},
        likes: [{ type: mongoose.Schema.Types.ObjectId,ref:'user'}],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
        
    }
);

export const PostModel = mongoose.model("post", PostSchema)