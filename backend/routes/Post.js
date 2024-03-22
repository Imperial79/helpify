import express from "express";
import { createPost,profilePost } from "../controllers/Posts.js";

const router = express.Router();

router.get("/profile-post/:userID", profilePost);

router.post("/create-post", createPost);

export {router as postRouter};