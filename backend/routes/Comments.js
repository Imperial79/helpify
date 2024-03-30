import express from 'express';
import { createComment, deleteComment, getComments, likeComment } from "../controllers/Comments.js";
const router = express.Router();

router.post('/', createComment);
router.get('/post/:postID',getComments);
router.put('/:commentID/like', likeComment);
router.delete('/:id', deleteComment);

export {router as commentRouter};