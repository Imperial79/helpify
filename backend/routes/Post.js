import express from "express";
import { createPost,profilePost,allPosts } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", allPosts);

router.get("/profile-post/:userID", profilePost);

router.post("/create-post", createPost);

export {router as postRouter};