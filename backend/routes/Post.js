import express from "express";
import { createPost } from "../controllers/Posts.js";

const router = express.Router();

router.post("/add-post", createPost);

export {router as postRouter};