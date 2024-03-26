import express from "express";
import { createPost,profilePost,allPosts,likePost,deletePost } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", allPosts);
router.delete("/:postID", deletePost);

router.get("/profile-post/:userID", profilePost);

router.post("/create-post", createPost);

router.put('/:postID/like',likePost);
export {router as postRouter};