import express from "express";
import { createPost,profilePost,allPosts,likePost } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", allPosts);

router.get("/profile-post/:userID", profilePost);

router.post("/create-post", createPost);

router.put('/:postID/like',likePost);
export {router as postRouter};